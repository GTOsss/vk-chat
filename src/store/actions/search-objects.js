import {ADD_OBJECT, MARK_OBJECT, CLEAR_SEARCH_OBJECTS, TOGGLE_LOADING} from '../constans'

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
  return (dispatch, getState) => {
    const {firebase, vkInfo: {viewerId}} = getState().user;
    firebase.database().ref(`/users/${viewerId}/searchObjects/users/${id}`).remove();
    firebase.database().ref(`/users/${viewerId}/searchObjects/info/${id}`).remove();
  }
};

export const updateSearchObjects = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: TOGGLE_LOADING,
      loadingObj: {searchObjects: true}
    });
    dispatch({
      type: CLEAR_SEARCH_OBJECTS
    });

    const {firebase, vkInfo: {viewerId}} = getState().user;
    firebase.database().ref(`users/${viewerId}/searchObjects/info`).on('value', (searchObjects) => {
      dispatch({
        type: CLEAR_SEARCH_OBJECTS
      });

      let objects = [];
      searchObjects = searchObjects.val();
      for (let name in searchObjects) {
        if(searchObjects.hasOwnProperty(name))
          objects.push({...searchObjects[name], id: name})
      }

      objects.forEach((el) => {
        dispatch({
          type: ADD_OBJECT,
          object: el
        });
      });

      dispatch({
        type: TOGGLE_LOADING,
        loadingObj: {searchObjects: false}
      })
    });
  }
};

export const markObject = (id) => {
  return {
    type: MARK_OBJECT,
    id: id
  }
};