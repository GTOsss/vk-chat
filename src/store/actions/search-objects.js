import {vkApi} from '../../services/vk-service'
import {
  ADD_OBJECT,
  MARK_OBJECT,
  CLEAR_SEARCH_OBJECTS,
  TOGGLE_LOADING,
  LOAD_SLICE_USERS_SUCCESS,
  SET_INFO_OBJECT_SEARCH,
  CLEAR_USERS
} from '../constans'

export const addObject = () => {
  return (dispatch, getState) => {
    let {
      user: {groups, firebase, vkInfo: {viewerId}},
      searchResults: {searchParams, searchResults: users}
    } = getState();

    groups = groups.map((el) => (el.isMarked ? {
      isMarked: el.isMarked,
      id: el.id,
      name: el.name,
      photo_50: el.photo_50
    } : null)).filter((el) => el);

    for(let propName in searchParams) {
      if(searchParams.hasOwnProperty(propName) && !searchParams[propName])
        delete searchParams[propName];
    }

    let dbObject = {
      info: {
        usersCount: users.length,
        groups: groups,
        searchParams: searchParams
      },
      users: JSON.stringify(users)
    };

    const {} = getState().user;
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

export const loadUsers = ({id, city, ageFrom, ageTo, sex, groups, usersCount}) => {
  return async (dispatch, getState) => {
    dispatch({type: CLEAR_USERS});

    dispatch({
      type: TOGGLE_LOADING,
      loadingObj: {sliceUsers: true}
    });

    const {user: {firebase, vkInfo: {viewerId}}} = getState();
    let url = `/users/${viewerId}/searchObjects/users/${id}`;
    let usersIds = await firebase.database().ref(url).once('value');
    usersIds = JSON.parse(usersIds.val());

    dispatch({
      type: SET_INFO_OBJECT_SEARCH,
      usersCount,
      groups,
      searchParams: {city, ageFrom, ageTo, sex, deepSearch: 'searchObjects'},
      searchResults: usersIds
    });

    let resp = await vkApi('users.get', {
      user_ids: usersIds.slice(0, 20).join(','),
      fields: 'photo_100, followers_count'
    });
    let users = resp.response;

    dispatch({
      type: LOAD_SLICE_USERS_SUCCESS,
      users: users ? users : []
    });

    dispatch({
      type: TOGGLE_LOADING,
      loadingObj: {sliceUsers: false}
    });
  }
};