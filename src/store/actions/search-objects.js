import {ADD_OBJECT, DELETE_OBJECT} from '../constans'
import {localStorageMod, constsLocalStorage} from '../../services/local-storage'


export const addObject = (object) => {
  let listObjectKeys = localStorageMod.get(constsLocalStorage.listObjectKeys);
  if(listObjectKeys && listObjectKeys.length) {
    listObjectKeys = [...listObjectKeys, object.id];
  } else {
    listObjectKeys = [object.id];
  }
  localStorageMod.set(constsLocalStorage.listObjectKeys, listObjectKeys);
  localStorageMod.set(object.id, object);

  return {
    type: ADD_OBJECT,
    object: object
  }
};

export const deleteObject = (id) => {
  return {
    type: DELETE_OBJECT,
    id: id
  }
};

export const loadObjectsFromLocalStorage = () => {
  return (dispatch) => {
    let listObjectKeys = localStorageMod.get(constsLocalStorage.listObjectKeys);
    if(listObjectKeys && listObjectKeys.length) {
      listObjectKeys.forEach((el) => {
        dispatch({
          type: ADD_OBJECT,
          object: localStorageMod.get(el)
        });
      });
    }
  }
};