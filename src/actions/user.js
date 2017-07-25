export const GET_COMMUNITIES_REQUEST = 'GET_COMMUNITIES_REQUEST';
export const GET_COMMUNITIES_FAIL = 'GET_COMMUNITIES_FAIL';
export const GET_COMMUNITIES_SUCCESS = 'GET_COMMUNITIES_SUCCESS';
export const GET_USER_INFO_REQUEST = 'GET_IINFO_REQUEST';
export const GET_USER_INFO_FAIL = 'GET_INFO_FAIL';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

export const getGroups = () => {
  return (dispatch) => {
    dispatch({type: GET_COMMUNITIES_REQUEST});
    VK.api('groups.get', {
      'user_id': 140286227,
      'extended': true,
      'filter': 0,
      'fields': 0,
      'offset': 0,
      'count': 999,
      'version': 5.62
    }, ({response: {count, items}}) => {
      dispatch({
        type: GET_COMMUNITIES_SUCCESS,
        communities: items
      });
    });
  }
};
