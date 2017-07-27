import {
  UPDATE_GROUPS_REQUEST,
  UPDATE_GROUPS_SUCCESS,
  UPDATE_GROUPS_FAIL
} from '../actions/user'

const initialState = {
  isLoadingGroups: false,
  groups: []
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GROUPS_REQUEST:
      return {...state, groups: [...state.groups], isLoadingGroups: true};
    case UPDATE_GROUPS_SUCCESS:
      return {...state, groups: [...action.groups], isLoadingGroups: false};
    case UPDATE_GROUPS_FAIL:
      return {...state, groups: [...state.groups], isLoadingGroups: false};
    default:
      return state
  }
}