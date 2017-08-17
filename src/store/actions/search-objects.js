import {ADD_OBJECT, DELETE_OBJECT} from '../constans'

export const addObject = (object) => {
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