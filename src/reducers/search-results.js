import {
  SEARCH_USERS_IN_GROUPS_USERS_START,
  SEARCH_USERS_IN_GROUPS_USERS_STEP,
  SEARCH_USERS_IN_GROUPS_USERS_SUCCESS
} from '../constans'

const initialState = {
  searchResults: [],
  groupsCount: 0,
  step: 0
};

export default function searchResults(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USERS_IN_GROUPS_USERS_START:
      return {...initialState, groupsCount: action.groupsCount};
    case SEARCH_USERS_IN_GROUPS_USERS_STEP:
      return {
        ...state,
        searchResult: [...state.searchResults],
        step: action.step
      };
    case SEARCH_USERS_IN_GROUPS_USERS_SUCCESS:
      return {
        ...state,
        searchResults: action.searchResults
      };
    default:
      return state
  }
}