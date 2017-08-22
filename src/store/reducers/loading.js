import {TOGGLE} from '../constans'

const initialState = {
  loadingObj: {}
};

export default function searchObjects(state = initialState, action) {
  switch (action.type) {
    case TOGGLE:
      return {...state, loadingObj : {...state.loadingObj, ...action.loadingObj}};
    default:
      return state;
  }
}