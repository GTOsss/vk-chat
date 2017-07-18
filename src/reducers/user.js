// ------------------------------------
// Action types
// ------------------------------------
export const GET_COMMUNITIES_REQUEST = 'GET_COMMUNITIES_REQUEST';
export const GET_COMMUNITIES_FAIL = 'GET_COMMUNITIES_FAIL';
export const GET_COMMUNITIES_SUCCESS = 'GET_COMMUNITIES_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export const getGroups = (communities) => {
  return async (dispatch) => {
    try {
      dispatch({types: GET_COMMUNITIES_REQUEST});
      const { data } = await VK.Api

      VK.Auth.login((r) => {
        if (r.session) {
          let username = r.session.user.first_name;
          console.log(username)
        } else {
        }
      }, 4);

      dispatch({
        type: GET_COMMUNITIES_SUCCESS,
        communities: communities
      });
    }
    catch(e) {
      console.log('error request');
      dispatch({type: GET_COMMUNITIES_FAIL})
    }
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  groups: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMUNITIES_REQUEST:
      return {...state, ...state.groups, isLoading: true};
    case GET_COMMUNITIES_SUCCESS:
      return {...state, ...action.groups, isLoading: false};
    case GET_COMMUNITIES_FAIL:
      return {...state, ...state.groups, isLoading: false};
    default:
      return state
  }
}