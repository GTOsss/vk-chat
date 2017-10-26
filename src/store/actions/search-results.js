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

const loadGroupMembers = (getState, dispatch, group, currentSearchId) =>
  new Promise((resolve) => {
    const { user: { vkInfo: { accessToken } } } = getState();

    const countRequest = Math.ceil(group.members_count / (1000 * 25));
    let resultUsers = [];
    let progress = 0;

    const request = async (countReq, j = 0) => {
      if (getState().searchResults.currentSearchId !== currentSearchId) {
        resolve('break');
        return;
      }

      if (j < countReq) {
      /* eslint-disable */
      const codeParams = '{' +
        '"offset": (i * 1000) + ' + j * 25000 + ', ' +
        '"count": 1000, ' +
        '"access_token": "' + accessToken + '", ' +
        '"group_id":' + group.id + ', ' +
        '"version": 5.67' + '}';

      const code = 'var resultArrays = [];\n' +
        'var i = 0;\n' +
        'while (i < 25) {\n' +
        '  var result = API.groups' +
        '.getMembers('+ codeParams +');\n' +
        '  resultArrays.push(result);\n' +
        '  i = i + 1;\n' +
        '}\n' +
        '\n' +
        '\n' +
        'return resultArrays;';
      /* eslint-enable */

        let result = await vkApiTimeout('execute', { code });
        result = result.response
          .reduce((prev, curr) => [...prev, ...curr.items], []);

        if (j !== 0) {
          progress = (j / countReq) * 100;

          dispatch({
            type: SEARCH_USERS_IN_GROUP_STEP,
            progress,
          });
        }

        resultUsers = [...resultUsers, ...result];
        request(countReq, j + 1);
      } else {
        resolve(resultUsers);
      }
    };
    request(countRequest);
  });

const loadUsers = (getState, dispatch, ids, fields,
  currentSearchId, validateObj) => new Promise((resolve) => {
  const countRequest = Math.ceil(ids.length / (1000 * 10));
  let resultUsers = [];

  dispatch({
    type: SEARCH_USERS_IN_GROUPS_SUCCESS,
    searchResults: [],
    endSearch: true,
    progress: 0.1,
  });

  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { sliceUsers: false },
  });

  const request = async (countReq, j = 0) => {
    const prevLength = resultUsers.length;
    if (!currentSearchId || (getState().searchResults.currentSearchId !== currentSearchId)) {
      resolve('break');
      return;
    }

    const arraysIds = [];
    for (let i = 0; i < 10; i += 1) { arraysIds.push(`"${ids.splice(0, 1000).join(',')}"`); }
    if (j < countReq) {
      /* eslint-disable */
      const code = 'var resultArrays = [];\n' +
        'var i = 0;\n' +
        'var ids = [' + arraysIds + '];\n' +
        'while (i < 10) {\n' +
        '  var result = API.users.get('+ '{' +
              '"fields": ' + fields + ', ' +
              '"user_ids": ids[i], ' +
              '"version": 5.67' + '}' +');\n' +
        '  resultArrays.push(result);\n' +
        '  i = i + 1;\n' +
        '}\n' +
        '\n' +
        '\n' +
        'return resultArrays;';
      /* eslint-enable */
      let result = await vkApiTimeout('execute', { code });
      result = result.response
        .reduce((prev, curr) => [...prev, ...curr], [])
        .filter(el => validateUser(el, validateObj))
        .map(el => el.id);
      resultUsers = [...resultUsers, ...result];

      if (!currentSearchId || (getState().searchResults.currentSearchId !== currentSearchId)) {
        resolve('break');
        return;
      }

      dispatch({
        type: SEARCH_USERS_IN_GROUPS_SUCCESS,
        searchResults: resultUsers,
        endSearch: true,
      });

      const currentLength = resultUsers.length;
      if (prevLength < 20) {
        if ((currentLength + prevLength) > 20) {
          loadSliceUsers(prevLength, 20 - prevLength)(dispatch, getState);
        } else {
          loadSliceUsers(prevLength, currentLength)(dispatch, getState);
        }
      }

      dispatch({
        type: SEARCH_USERS_IN_GROUP_STEP,
        progress: ((j / countReq) * 100) + (j ? 0 : 0.1),
      });

      request(countReq, j + 1);
    } else {
      dispatch({
        type: SEARCH_USERS_IN_GROUP_STEP,
        progress: 100,
      });
      resolve(resultUsers);
    }
  };
  request(countRequest);
});

export const searchInSearchObjects = ({ city, ageFrom, ageTo, sex }) =>
  async (dispatch, getState) => {
    const fields = `"${city ? 'city,' : ''} ${sex ? 'sex,' : ''} ${
      ageTo || ageFrom ? 'bdate,' : ''} deactivated"`;
    const cityValue = city && city.value;
    const currentSearchId = Math.random().toString(36).substr(2, 9);
    dispatch({ type: CLEAR_USERS });
    const {
      searchObjects: { objects: searchObjects },
      user: { firebase, vkInfo: { viewerId } },
    } = getState();
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

    let usersArrays = [];
    for (let i = 0; i < objects.length; i += 1) {
      if (getState().searchResults.currentSearchId !== currentSearchId) {
        return;
      }

      // eslint-disable-next-line
      let objIds = await (firebase.database()
        .ref(`/users/${viewerId}/searchObjects/users/${objects[i].id}`).once('value'));
      objIds = JSON.parse(objIds.val());
      usersArrays.push(objIds);

      dispatch({
        type: SEARCH_USERS_IN_GROUPS_STEP,
        step: i + 1,
      });
    }

    usersArrays = usersArrays.reduce((prev, curr) => intersectionArrays(prev, curr));

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults: usersArrays,
      endSearch: true,
    });
    console.log('endSearchTrue!!!');

    usersArrays = await loadUsers(getState, dispatch, usersArrays, fields,
      currentSearchId, { city: cityValue, ageFrom, ageTo, sex });
    if (usersArrays === 'break') { return; }

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults: usersArrays,
      endSearch: true,
    });
  };

export const deepSearchInGroups = ({ city, ageFrom, ageTo, sex, deepSearch }) => {
  const currentSearchId = Math.random().toString(36).substr(2, 9);
  const fields = `"${city ? 'city,' : ''} ${sex ? 'sex,' : ''} ${
    ageTo || ageFrom ? 'bdate,' : ''} deactivated"`;
  return async (dispatch, getState) => {
    dispatch({ type: CLEAR_USERS });
    const groups = getState().user.groups.filter(el => el.isMarked);
    dispatch({
      type: SEARCH_USERS_IN_GROUPS_START,
      groupsCount: groups.length,
      searchParams: { city, ageFrom, ageTo, sex, deepSearch },
      currentSearchId,
    });

    const responseArrays = [];
    const cityValue = city && city.value;
    for (let i = 0; i < groups.length; i += 1) {
      dispatch({
        type: CURRENT_GROUP_SEARCH,
        group: groups[i],
      });

      const progressGroup = getState().searchResults.step;
      if (progressGroup !== i) {
        dispatch({
          type: SEARCH_USERS_IN_GROUPS_STEP,
          step: i,
        });
      }

      // eslint-disable-next-line
      const resultRequests = await loadGroupMembers(getState, dispatch, groups[i], currentSearchId);
      if (resultRequests === 'break') {
        return;
      }

      responseArrays.push(resultRequests);
    }

    let searchResults = responseArrays.reduce((prev, curr) => intersectionArrays(prev, curr));

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults: [],
      endSearch: true,
    });
    dispatch({
      type: SEARCH_USERS_IN_GROUP_STEP,
      progress: 100,
    });
    searchResults = await loadUsers(getState, dispatch, searchResults, fields,
      currentSearchId, { city: cityValue, ageFrom, ageTo, sex });
    if (searchResults === 'break') { return; }

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults,
      endSearch: true,
    });
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

  let usersArrays = [];

  for (let i = 0; i < groups.length; i += 1) {
    // eslint-disable-next-line
    let resp = await vkApiTimeout('users.search', {
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

    if (getState().searchResults.currentSearchId !== currentSearchId) {
      return;
    }

    resp = resp.response.items.map(el => el.id).sort((a, b) => (a < b ? -1 : 1));
    usersArrays.push(resp);

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_STEP,
      step: i + 1,
    });
  }

  usersArrays = usersArrays.reduce((prev, curr) => intersectionArrays(prev, curr));

  dispatch({
    type: SEARCH_USERS_IN_GROUPS_SUCCESS,
    searchResults: usersArrays,
    endSearch: true,
  });
  dispatch({
    type: SEARCH_USERS_IN_GROUP_STEP,
    progress: 100,
  });
  loadSliceUsers(0, 20)(dispatch, getState);
};
