// ------------------------------------
// Action types
// ------------------------------------
export const GET_USER = 'GET_USER';

// ------------------------------------
// Actions
// ------------------------------------

export const getUser = (user) => (
  (dispatch) => {
    dispatch({
      type: GET_USER,
      user
    })
  }
);

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userName: '',
  firstName: '',
  lastName: ''
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...action.user};
    default:
      return state
  }
}