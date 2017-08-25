import {
  SEARCH_USERS_IN_GROUPS_START,
  SEARCH_USERS_IN_GROUPS_STEP,
  SEARCH_USERS_IN_GROUP_STEP,
  SEARCH_USERS_IN_GROUPS_SUCCESS,
  LOAD_SLICE_USERS_SUCCESS,
  CLEAR_USERS
} from '../constans'

const initialState = {
  searchResults: [],
  users: [],
  groups: [],
  groupsCount: 0,
  step: 0,
  progressGroup: 0
};

export default function searchResults(state = initialState, action) {
  switch (action.type) {
    case CLEAR_USERS:
      return {...state, users: [], step: 0, progressGroup: 0};
    case SEARCH_USERS_IN_GROUPS_START:
      return {
        ...state,
        groupsCount: action.groupsCount,
        searchParams: action.searchParams,
        groups: action.groups && action.groups.length ? [...action.groups] : []
      };
    case SEARCH_USERS_IN_GROUPS_STEP:
      return {
        ...state,
        step: action.step
      };
    case SEARCH_USERS_IN_GROUP_STEP:
      return {
        ...state,
        progressGroup: action.progress
      };
    case SEARCH_USERS_IN_GROUPS_SUCCESS:
      return {
        ...state,
        searchResults: action.searchResults && action.searchResults.length ? [...action.searchResults] : []
      };
    case LOAD_SLICE_USERS_SUCCESS:
      return {
        ...state,
        users: action.users && action.users.length
          ? [...state.users.map((el) => ({...el})), ...action.users.map((el) => ({...el}))]
          : [...state.users.map((el) => ({...el}))]
      };
    default:
      return state;
  }
}