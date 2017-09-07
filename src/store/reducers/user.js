import {
  UPDATE_GROUPS_SUCCESS,
  UPDATE_SLICE_GROUPS_SUCCESS,
  UPDATE_GROUPS_FAIL,
  MARK_GROUP,
  UPDATE_VK_INFO,
  INIT_FIREBASE,
  LOAD_PROFILE
} from '../constans/index'

const initialState = {
  groups: []
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GROUPS_SUCCESS:
      return {...state, groups: [...action.groups]};
    case UPDATE_SLICE_GROUPS_SUCCESS:
      return {...state, groups: [...state.groups, ...action.groups]};
    case UPDATE_GROUPS_FAIL:
      return {...state, groups: [...state.groups]};
    case MARK_GROUP:
      let newGroups = [...state.groups];
      for (let i = 0; i < newGroups.length; i++) {
        if(newGroups[i].id === action.idGroup) {
          newGroups[i].isMarked = !newGroups[i].isMarked;
          newGroups[i].timeMarked = Date.now();
          break;
        }
      }
      return {...state, groups: newGroups, isLoadingGroups: false};
    case UPDATE_VK_INFO:
      return {...state, groups: [...state.groups], vkInfo: action.vkInfo};
    case INIT_FIREBASE:
      return {...state, groups: [...state.groups], firebase: action.firebase};
    case LOAD_PROFILE:
      return {...state, groups: [...state.groups], profile: action.profile};
    default:
      return state;
  }
}