import {testResponse} from '../services/vkService'

export const UPDATE_GROUPS_REQUEST = 'GET_COMMUNITIES_REQUEST';
export const UPDATE_GROUPS_FAIL = 'GET_COMMUNITIES_FAIL';
export const UPDATE_GROUPS_SUCCESS = 'GET_COMMUNITIES_SUCCESS';
export const UPDATE_USER_INFO_REQUEST = 'GET_IINFO_REQUEST';
export const UPDATE_USER_INFO_FAIL = 'GET_INFO_FAIL';
export const UPDATE_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

export const updateGroups = (userId) => {
  return (dispatch) => {
    dispatch({type: UPDATE_GROUPS_REQUEST});
    VK.api('groups.get', {
      'user_id': userId,
      'extended': true,
      'filter': 0,
      'fields': 0,
      'offset': 0,
      'count': 999,
      'version': 5.62
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
