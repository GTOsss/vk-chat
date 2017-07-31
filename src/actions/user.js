import {testResponse, vkApi} from '../services/vkService'
import {intersectionArrays} from '../services/operations'
import {
  UPDATE_GROUPS_REQUEST,
  UPDATE_GROUPS_FAIL,
  UPDATE_GROUPS_SUCCESS,
  MARK_GROUP,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAIL,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_SEARCH_RESULT_USERS_REQUEST,
  UPDATE_SEARCH_RESULT_USERS_FAIL,
  UPDATE_SEARCH_RESULT_USERS_SUCCESS,
  SEARCH_USERS_IN_GROUPS_USERS_START,
  SEARCH_USERS_IN_GROUPS_USERS_FAIL,
  SEARCH_USERS_IN_GROUPS_USERS_SUCCESS,
  SEARCH_USERS_IN_GROUPS_USERS_STEP,
  UPDATE_VK_INFO
} from '../constans'
let getURLParam = require('get-url-param');

export const searchUsersInGroups = ({country, city, ageFrom, ageTo, sex, accessToken}) => {
  return async (dispatch, getState) => {
    dispatch({type: SEARCH_USERS_IN_GROUPS_USERS_START});
    const groups = getState().user.groups;
    const length = groups.length;
    let searchResults = [];
    for(let i = 0; i < length; i++) {
      if(!groups[i].isMarked) { continue }
      const response = await vkApi('users.search', {
        'fields': 'photo_100, photo_max_orig, online, last_seen, ' +
        'followers_count, city, about, relation, status',
        'access_token': accessToken,
        'offset': 0,
        'count': 999,
        'country': country ? country : undefined,
        'city': city ? city : undefined,
        'sex': sex ? sex : undefined,
        'age_from': ageFrom ? ageFrom : undefined,
        'age_to': ageTo ? ageTo : undefined,
        'group_id': groups[i].id,
        'version': 5.67
      });

      searchResults.push(response.response.items);
    }

    searchResults = searchResults.reduce((a, b) => {
      return intersectionArrays(a, b);
    });

    console.log(searchResults);
  }
};

export const updateGroups = (userId) => {
  return (dispatch) => {
    dispatch({type: UPDATE_GROUPS_REQUEST});
    VK.api('groups.get', {
      'user_id': userId,
      'extended': 1,
      'filter': 0,
      'fields': 'members_count',
      'offset': 0,
      'count': 999,
      'version': 5.67
    }, (resp) => {
      try {
        testResponse(resp);
        const {response: {items}} = resp;
        dispatch({
          type: UPDATE_GROUPS_SUCCESS,
          groups: items
        });
      }
      catch (e) {
        dispatch({type: UPDATE_GROUPS_FAIL})
      }
    });
  }
};

export const markGroup = (i) => ({
  type: MARK_GROUP,
  indexGroup: i
});

export const getVkInfo = () => {
  return (dispatch) => {
    const vkInfo = {
      viewerId: getURLParam(frameHref, 'viewer_id'),
      viewerType:  getURLParam(frameHref, 'viewer_type'),
      language: getURLParam(frameHref, 'language'),
      accessToken: getURLParam(frameHref, 'access_token')
    };
    dispatch({
      type: UPDATE_VK_INFO,
      vkInfo: vkInfo
    });
  }
};
