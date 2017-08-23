import {TOGGLE_LOADING} from '../constans'

const initialState = {
  loadingObj: {}
};

export default function searchObjects(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {...state, loadingObj : {...state.loadingObj, ...action.loadingObj}};
    default:
      return state;
  }
}