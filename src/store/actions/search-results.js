import {vkApi, vkApiTimeout} from '../../services/vk-service'
import {intersectionArrays, validateUser} from '../../services/operations'
import {
  SEARCH_USERS_IN_GROUPS_START,
  SEARCH_USERS_IN_GROUPS_STEP,
  SEARCH_USERS_IN_GROUP_STEP,
  SEARCH_USERS_IN_GROUPS_FAIL,
  LOAD_SLICE_USERS_SUCCESS,
  SEARCH_USERS_IN_GROUPS_SUCCESS,
  TOGGLE_LOADING,
  CLEAR_USERS,
  CURRENT_GROUP_SEARCH
} from '../constans/index'

export const searchInSearchObjects = ({city, ageFrom, ageTo, sex}) => {
  return async (dispatch, getState) => {
    dispatch({type: CLEAR_USERS});

    const {searchObjects: {objects: searchObjects}, user: {firebase, vkInfo: {viewerId}}} = getState();
    let groups = [];
    let objects = searchObjects.filter((el) => {
      if(el.isMarked) {
        groups = [...groups, ...el.groups];
      }
      return el.isMarked
    });

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_START,
      groupsCount: groups.length,
      searchParams: {city, ageFrom, ageTo, sex, deepSearch: 'searchObjects'},
      groups
    });

    let arraysUsers = [];
    for (let i = 0; i < objects.length; i++) {
      let users = await firebase.database()
        .ref(`/users/${viewerId}/searchObjects/users/${objects[i].id}`).once('value');
      arraysUsers.push(users.val());
    }

    let resultArrays = [];
    for (let i = 0; i < arraysUsers.length; i++) {
      let el = arraysUsers[i];
      let currentUsers = [];
      let ids = JSON.parse(el);

      let countIter = ids.length / 500;
      for (let j = 0; j < countIter; j++) {
        let response = await vkApiTimeout('users.get', {
          'user_ids': ids.splice(0,500).join(','),
          'fields': 'city, bdate, sex',
          'version': 5.68
        }, 0);

        response = response.response.filter((el) => {
          return validateUser(el, {city, ageFrom, ageTo, sex});
        });

        currentUsers = currentUsers.concat(response.map((el) => el.id));

        dispatch({
          type: SEARCH_USERS_IN_GROUP_STEP,
          progress: j / countIter * 100
        });
      }
      resultArrays.push(currentUsers);

      dispatch({
        type: SEARCH_USERS_IN_GROUPS_STEP,
        step: i+1
      });
    }

    let searchResults = resultArrays.reduce((a, b) => {
      return intersectionArrays(a, b);
    });

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults
    });

    loadSliceUsers(0, 20)(dispatch, getState);
  }
};

export const deepSearchInGroups = ({city, ageFrom, ageTo, sex, deepSearch, accessToken}) => {
  const fields = `${city ? 'city,' : ''} ${sex ? 'sex,' : ''} ${ageTo || ageFrom ? 'bdate,' : ''} deactivated`;
  return async (dispatch, getState) => {
    dispatch({type: CLEAR_USERS});
    const groups = getState().user.groups.filter((el) => el.isMarked);
    dispatch({
      type: SEARCH_USERS_IN_GROUPS_START,
      groupsCount: groups.length,
      searchParams: {city, ageFrom, ageTo, sex, deepSearch}
    });

    let searchResults = [];
    city = city && city.value;
    for(let i = 0; i < groups.length; i++) {
      dispatch({
        type: CURRENT_GROUP_SEARCH,
        group: groups[i]
      });
      let countMembers = groups[i].members_count;
      let countRequest = Math.ceil(countMembers / 1000);
      let currentGroupMembers = [];
      const onePercent = (countRequest / 100);
      let counter = 0;
      let progress = 0;
      for(let j = 0; j <= countRequest; j++) {
        let currentGroupMembersThisIter = [];
        let response;

        try {
          response = await vkApiTimeout('groups.getMembers', {
            'fields': fields,
            'access_token': accessToken,
            'offset': j * 1000,
            'count': 1000,
            'group_id': groups[i].id,
            'version': 5.67
          }, 200);
        } catch (e) {
          console.error(e);
        }

        currentGroupMembersThisIter = response.response.items.filter((el) => {
          return validateUser(el, {city, ageFrom, ageTo, sex});
        });

        if(counter >= onePercent) {
          counter = 0;
          progress = j / countRequest * 100;

          dispatch({
            type: SEARCH_USERS_IN_GROUP_STEP,
            progress
          });
        }
        counter++;

        currentGroupMembers = [...currentGroupMembers, ...currentGroupMembersThisIter];
      }
      searchResults.push(currentGroupMembers.map((el) => el.id));

      dispatch({
        type: SEARCH_USERS_IN_GROUPS_STEP,
        step: i+1
      });
    }

    searchResults = searchResults.reduce((a, b) => {
      return intersectionArrays(a, b);
    });

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults: searchResults
    });

    loadSliceUsers(0, 20)(dispatch, getState);
  }
};

export const searchUsersInGroups = ({country, city, ageFrom, ageTo, sex, deepSearch, accessToken}) => {
  return async (dispatch, getState) => {
    dispatch({type: CLEAR_USERS});
    const groups = getState().user.groups.filter((el) => el.isMarked);
    const length = groups.length;
    dispatch({
      type: SEARCH_USERS_IN_GROUPS_START,
      groupsCount: length,
      searchParams: {city, ageFrom, ageTo, sex, deepSearch}
    });

    city = city && city.value;
    let searchResults = [];
    for(let i = 0; i < length; i++) {
      const response = await vkApi('users.search', {
        'access_token': accessToken,
        'offset': 0,
        'count': 1000,
        'country': country ? country : undefined,
        'city': city ? city : undefined,
        'sex': sex ? sex : undefined,
        'age_from': ageFrom ? ageFrom : undefined,
        'age_to': ageTo ? ageTo : undefined,
        'group_id': groups[i].id,
        'version': 5.67
      });

      dispatch({
        type: SEARCH_USERS_IN_GROUPS_STEP,
        step: i+1
      });

      searchResults.push(response.response.items.map((el) => el.id));
    }

    searchResults = searchResults.reduce((a, b) => {
      return intersectionArrays(a, b);
    });

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults
    });

    loadSliceUsers(0, 20)(dispatch, getState);
  }
};

export const loadSliceUsers = (offset, count) => {
  return async (dispatch, getState) => {
    dispatch({
      type: TOGGLE_LOADING,
      loadingObj: {sliceUsers: true}
    });

    let searchResults = getState().searchResults.searchResults;

    let resp = await vkApi('users.get', {
      user_ids: searchResults.slice(offset, offset+count).join(','),
      fields: 'photo_100, followers_count'
    });
    let users = resp.response;

    dispatch({
      type: LOAD_SLICE_USERS_SUCCESS,
      users: users ? users : []
    });

    dispatch({
      type: TOGGLE_LOADING,
      loadingObj: {sliceUsers: false}
    });
  }
};
