import { vkApi, vkApiTimeout } from '../../services/vk-service';
import { intersectionArrays, validateUser } from '../../services/operations';
import {
  SEARCH_USERS_IN_GROUPS_START,
  SEARCH_USERS_IN_GROUPS_STEP,
  SEARCH_USERS_IN_GROUP_STEP,
  SEARCH_USERS_IN_GROUPS_FAIL,
  LOAD_SLICE_USERS_SUCCESS,
  SEARCH_USERS_IN_GROUPS_SUCCESS,
  TOGGLE_LOADING,
  CLEAR_USERS,
  CURRENT_GROUP_SEARCH,
} from '../constans/index';

export const loadSliceUsers = (offset, count) => async (dispatch, getState) => {
  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { sliceUsers: true },
  });

  const searchResults = getState().searchResults.searchResults;

  const resp = await vkApi('users.get', {
    user_ids: searchResults.slice(offset, offset + count).join(','),
    fields: 'photo_100, followers_count',
  });
  const users = resp.response;

  dispatch({
    type: LOAD_SLICE_USERS_SUCCESS,
    users: users || [],
  });

  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { sliceUsers: false },
  });
};

export const searchInSearchObjects = ({ city, ageFrom, ageTo, sex }) =>
  async (dispatch, getState) => {
    const currentSearchId = Math.random().toString(36).substr(2, 9);
    dispatch({ type: CLEAR_USERS });

    const { searchObjects: { objects: searchObjects },
      user: { firebase, vkInfo: { viewerId } } } = getState();
    let groups = [];
    const objects = searchObjects.filter((el) => {
      if (el.isMarked) {
        groups = [...groups, ...el.groups];
      }
      return el.isMarked;
    });

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_START,
      groupsCount: groups.length,
      searchParams: { city, ageFrom, ageTo, sex, deepSearch: 'searchObjects' },
      groups,
      currentSearchId,
    });

    const results = [];
    for (let i = 0; i < objects.length; i += 1) {
      results.push(firebase.database()
        .ref(`/users/${viewerId}/searchObjects/users/${objects[i].id}`).once('value'));
    }

    let arraysUsers = await Promise.all(results);
    arraysUsers = arraysUsers.map(el => el.val());

    const responsesArrays = [];
    for (let i = 0; i < arraysUsers.length; i += 1) {
      const element = arraysUsers[i];
      const ids = JSON.parse(element);
      const responsesCurrentObj = [];
      const countIter = ids.length / 500;
      for (let j = 0; j < countIter; j += 1) {
        if (getState().searchResults.currentSearchId !== currentSearchId) {
          return;
        }

        responsesCurrentObj.push(vkApiTimeout('users.get', {
          user_ids: ids.splice(0, 500).join(','),
          fields: 'city, bdate, sex',
          version: 5.68,
        }, 0, undefined, () => {
          dispatch({
            type: SEARCH_USERS_IN_GROUP_STEP,
            progress: (j / countIter) * 100,
          });

          const progressGroup = getState().searchResults.progressGroup;
          if (progressGroup !== (i + 1)) {
            dispatch({
              type: SEARCH_USERS_IN_GROUPS_STEP,
              step: i + 1,
            });
          }
        }));
      }
      responsesArrays.push(responsesCurrentObj);
    }

    const arrayPromiseResults = responsesArrays.map(async (el) => {
      const vkResponse = await Promise.all(el);
      return vkResponse.reduce((prev, curr) => {
        let currentResponse = curr.response;
        currentResponse = currentResponse
          .filter(user => validateUser(user, { city, ageFrom, ageTo, sex }));

        return [...prev, ...currentResponse];
      }, []);
    });

    const arrayResults = await Promise.all(arrayPromiseResults);

    console.log(arrayResults);
    const searchResults = arrayResults.reduce((a, b) => intersectionArrays(a, b));
    console.log(searchResults);
    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults,
    });

    loadSliceUsers(0, 20)(dispatch, getState);
  };

export const deepSearchInGroups = ({ city, ageFrom, ageTo, sex, deepSearch, accessToken }) => {
  const currentSearchId = Math.random().toString(36).substr(2, 9);
  const fields = `${city ? 'city,' : ''} ${sex ? 'sex,' : ''} ${
    ageTo || ageFrom ? 'bdate,' : ''} deactivated`;
  return async (dispatch, getState) => {
    dispatch({ type: CLEAR_USERS });
    const groups = getState().user.groups.filter(el => el.isMarked);
    dispatch({
      type: SEARCH_USERS_IN_GROUPS_START,
      groupsCount: groups.length,
      searchParams: { city, ageFrom, ageTo, sex, deepSearch },
      currentSearchId,
    });

    let searchResults = [];
    const cityValue = city && city.value;
    for (let i = 0; i < groups.length; i += 1) {
      dispatch({
        type: CURRENT_GROUP_SEARCH,
        group: groups[i],
      });
      const countMembers = groups[i].members_count;
      const countRequest = Math.ceil(countMembers / 1000);
      let currentGroupMembers = [];
      const onePercent = countRequest / 100;
      let counter = 0;
      let progress = 0;
      for (let j = 0; j <= countRequest; j += 1) {
        if (getState().searchResults.currentSearchId !== currentSearchId) {
          return;
        }

        let currentGroupMembersThisIter = [];
        let response;

        try {
          response = await vkApiTimeout('groups.getMembers', {
            fields,
            access_token: accessToken,
            offset: j * 1000,
            count: 1000,
            group_id: groups[i].id,
            version: 5.67,
          }, 200);
        } catch (e) {
          console.error(e);
        }

        currentGroupMembersThisIter = response.response.items.filter(el =>
          validateUser(el, { city: cityValue, ageFrom, ageTo, sex }));

        if (counter >= onePercent) {
          counter = 0;
          progress = (j / countRequest) * 100;

          dispatch({
            type: SEARCH_USERS_IN_GROUP_STEP,
            progress,
          });
        }
        counter += 1;

        currentGroupMembers = [...currentGroupMembers, ...currentGroupMembersThisIter];
      }
      searchResults.push(currentGroupMembers.map(el => el.id));

      dispatch({
        type: SEARCH_USERS_IN_GROUPS_STEP,
        step: i + 1,
      });
    }

    searchResults = searchResults.reduce((a, b) => intersectionArrays(a, b));

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults,
    });

    loadSliceUsers(0, 20)(dispatch, getState);
  };
};

export const searchUsersInGroups = ({ country, city, ageFrom,
  ageTo, sex, deepSearch, accessToken }) => async (dispatch, getState) => {
  dispatch({ type: CLEAR_USERS });
  const currentSearchId = Math.random().toString(36).substr(2, 9);
  const groups = getState().user.groups.filter(el => el.isMarked);
  const length = groups.length;
  dispatch({
    type: SEARCH_USERS_IN_GROUPS_START,
    groupsCount: length,
    searchParams: { city, ageFrom, ageTo, sex, deepSearch },
    currentSearchId,
  });

  const cityValue = city && city.value;
  let searchResults = [];
  for (let i = 0; i < length; i += 1) {
    if (getState().searchResults.currentSearchId !== currentSearchId) {
      return;
    }

    const response = await vkApi('users.search', {
      access_token: accessToken,
      offset: 0,
      count: 1000,
      country: country || undefined,
      city: cityValue || undefined,
      sex: sex || undefined,
      age_from: ageFrom || undefined,
      age_to: ageTo || undefined,
      group_id: groups[i].id,
      version: 5.67,
    });

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_STEP,
      step: i + 1,
    });

    searchResults.push(response.response.items.map(el => el.id));
  }

  searchResults = searchResults.reduce((a, b) => intersectionArrays(a, b));

  dispatch({
    type: SEARCH_USERS_IN_GROUPS_SUCCESS,
    searchResults,
  });

  loadSliceUsers(0, 20)(dispatch, getState);
};
