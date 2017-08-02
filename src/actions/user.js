import {testResponse} from '../services/vkService'
import {
  UPDATE_GROUPS_REQUEST,
  UPDATE_GROUPS_FAIL,
  UPDATE_GROUPS_SUCCESS,
  MARK_GROUP,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAIL,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_VK_INFO
} from '../constans'
let getURLParam = require('get-url-param');


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
