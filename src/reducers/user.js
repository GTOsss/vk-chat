import {
  UPDATE_GROUPS_REQUEST,
  UPDATE_GROUPS_SUCCESS,
  UPDATE_GROUPS_FAIL,
  MARK_GROUP,
  UPDATE_VK_INFO
} from '../constans'

const initialState = {
  isLoadingGroups: false,
  groups: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GROUPS_REQUEST:
      return {...state, groups: [...state.groups], isLoadingGroups: true};
    case UPDATE_GROUPS_SUCCESS:
      return {...state, groups: [...action.groups]};
    case UPDATE_GROUPS_FAIL:
      return {...state, groups: [...state.groups]};
    case MARK_GROUP:
      let newGroups = [...state.groups];
      newGroups[action.indexGroup].isMarked = !newGroups[action.indexGroup].isMarked;
      return {...state, groups: newGroups, isLoadingGroups: false};
    case UPDATE_VK_INFO:
      return {...state, groups: [...state.groups], vkInfo: action.vkInfo};
    default:
      return state
  }
}