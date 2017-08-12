import {
  SEARCH_USERS_IN_GROUPS_START,
  SEARCH_USERS_IN_GROUPS_STEP,
  SEARCH_USERS_IN_GROUP_STEP,
  SEARCH_USERS_IN_GROUPS_SUCCESS
} from '../constans/index'

const initialState = {
  searchResults: [],
  groupsCount: 0,
  step: 0,
  progressGroup: 0
};

export default function searchResults(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USERS_IN_GROUPS_START:
      return {...initialState, groupsCount: action.groupsCount};
    case SEARCH_USERS_IN_GROUPS_STEP:
      return {
        ...state,
        step: action.step
      };
    case SEARCH_USERS_IN_GROUPS_SUCCESS:
      return {
        ...state,
        searchResults: action.searchResults
      };
    case SEARCH_USERS_IN_GROUP_STEP:
      return {
        ...state,
        progressGroup: action.progress
      };
    default:
      return state
  }
}