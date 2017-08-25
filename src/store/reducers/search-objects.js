import {ADD_OBJECT, DELETE_OBJECT, MARK_OBJECT, CLEAR_SEARCH_OBJECTS} from '../constans'

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
    case MARK_OBJECT:
      let newObjects = [...state.objects];
      for (let i = 0; i < newObjects.length; i++) {
        if (newObjects[i].id === action.id) {
          newObjects[i].isMarked = !newObjects[i].isMarked;
          break;
        }
      }
      return {...state, objects: newObjects};
    case CLEAR_SEARCH_OBJECTS:
      return {...state, objects: []};
    default:
      return state;
  }
}