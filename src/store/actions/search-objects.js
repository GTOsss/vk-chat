import {ADD_OBJECT, DELETE_OBJECT, MARK_OBJECT, CLEAR} from '../constans'

export const addObject = (object) => {
  return (dispatch, getState) => {
    object.groups = object.groups.map((el) => (el.isMarked ? {
      isMarked: el.isMarked,
      id: el.id,
      name: el.name,
      photo_50: el.photo_50
    } : null)).filter((el) => el);
    object.users = object.users.map((el) => el.id);

    for(let propName in object.searchParams) {
      if(object.searchParams.hasOwnProperty(propName) && !object.searchParams[propName])
        delete object.searchParams[propName];
    }

    let dbObject = {
      info: {
        usersCount: object.users.length,
        groups: object.groups,
        searchParams: object.searchParams
      },
      users: JSON.stringify(object.users)
    };

    const {firebase, vkInfo: {viewerId}} = getState().user;
    let refKey = firebase.database().ref(`/users/${viewerId}/searchObjects`).push().key;
    let updates = {};
    updates[`/users/${viewerId}/searchObjects/users/${refKey}`] = dbObject.users;
    updates[`/users/${viewerId}/searchObjects/info/${refKey}`] = dbObject.info;
    firebase.database().ref().update(updates);
  }
};

export const deleteObject = (id) => {
  return {
    type: DELETE_OBJECT,
    id: id
  }
};

export const updateSearchObjects = (objects) => {
  return (dispatch) => {
    dispatch({type: CLEAR});
    objects.forEach((el) => {
      dispatch({
        type: ADD_OBJECT,
        object: el
      });
    });
  }
};

export const markObject = (id) => {
  return {
    type: MARK_OBJECT,
    id: id
  }
};