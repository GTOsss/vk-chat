import {
  GET_COMMUNITIES_REQUEST,
  GET_COMMUNITIES_SUCCESS,
  GET_COMMUNITIES_FAIL
} from '../actions/user'

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