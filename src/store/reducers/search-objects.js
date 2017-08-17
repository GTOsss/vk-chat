import {ADD_OBJECT, DELETE_OBJECT} from '../constans'

const initialState = {
  objects: []
};

export default function searchObjects(state = initialState, action) {
  switch (action.type) {
    case ADD_OBJECT:
      return {...state, objects: [...state.objects, action.object]};
    case DELETE_OBJECT:
      let objects = state.objects.filter((el) => { return el.id !== action.id });
      return {...state, objects};
    default:
      return state;
  }
}