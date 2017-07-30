import {testResponse} from '../services/vkService'

export const UPDATE_GROUPS_REQUEST = 'GET_COMMUNITIES_REQUEST';
export const UPDATE_GROUPS_FAIL = 'GET_COMMUNITIES_FAIL';
export const UPDATE_GROUPS_SUCCESS = 'GET_COMMUNITIES_SUCCESS';
export const MARK_GROUP = 'MARK_GROUP';
export const UPDATE_USER_INFO_REQUEST = 'GET_INFO_REQUEST';
export const UPDATE_USER_INFO_FAIL = 'GET_INFO_FAIL';
export const UPDATE_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

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
      try{
        testResponse(resp);
        const {response: {items}} = resp;
        dispatch({
          type: UPDATE_GROUPS_SUCCESS,
          groups: items
        });
      }
      catch(e) {
        dispatch({
          type: UPDATE_GROUPS_FAIL
        })
      }
    });
  }
};

export const markGroup = (i) => ({
  type: MARK_GROUP,
  indexGroup: i
});
