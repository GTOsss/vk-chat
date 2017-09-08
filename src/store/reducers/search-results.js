import {
  SEARCH_USERS_IN_GROUPS_START,
  SEARCH_USERS_IN_GROUPS_STEP,
  SEARCH_USERS_IN_GROUP_STEP,
  SEARCH_USERS_IN_GROUPS_SUCCESS,
  LOAD_SLICE_USERS_SUCCESS,
  CLEAR_USERS,
  CURRENT_GROUP_SEARCH,
  SET_INFO_OBJECT_SEARCH,
  SAVE_OBJECT
} from '../constans'

const initialState = {
  searchResults: [],
  users: [],
  groups: [],
  groupsCount: 0,
  step: 0,
  progressGroup: 0,
  btnSaveShow: true
};

export default function searchResults(state = initialState, action) {
  switch (action.type) {
    case SAVE_OBJECT:
      return {...state, btnSaveShow: action.btnSaveShow};
    case CURRENT_GROUP_SEARCH:
      return {
        ...state,
        currentGroupSearch: action.group,
        noSearch: false
      };
    case CLEAR_USERS:
      return {...state, users: [], step: 0, progressGroup: 0};
    case SET_INFO_OBJECT_SEARCH:
      return {
        ...state,
        usersCount: action.usersCount,
        searchParams: action.searchParams,
        searchResults: action.searchResults,
        groups: action.groups && action.groups.length ? [...action.groups] : [],
        noSearch: true
      };
    case SEARCH_USERS_IN_GROUPS_START:
      return {
        ...state,
        groupsCount: action.groupsCount,
        searchParams: action.searchParams,
        groups: action.groups && action.groups.length ? [...action.groups] : [],
        noSearch: false
      };
    case SEARCH_USERS_IN_GROUPS_STEP:
      return {
        ...state,
        step: action.step,
        progressGroup: 0.1,
      };
    case SEARCH_USERS_IN_GROUP_STEP:
      return {
        ...state,
        progressGroup: action.progress,
      };
    case SEARCH_USERS_IN_GROUPS_SUCCESS:
      return {
        ...state,
        searchResults: action.searchResults && action.searchResults.length ? [...action.searchResults] : [],
        btnSaveShow: true
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