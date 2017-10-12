import moment from 'moment';
import { vkApi, showOrderBox } from '../../services/vk-service';
import { loadProfile } from '../actions/user';
import {
  ADD_OBJECT,
  MARK_OBJECT,
  CLEAR_SEARCH_OBJECTS,
  TOGGLE_LOADING,
  LOAD_SLICE_USERS_SUCCESS,
  SET_INFO_OBJECT_SEARCH,
  CLEAR_USERS,
  SAVE_OBJECT,
} from '../constans';

export const addObjectInDB = (dispatch, getState, isSearchSO) => {
  const state = getState();

  let { user: { groups } } = state;

  const {
    user: { firebase, vkInfo: { viewerId } },
    searchResults: { searchParams, searchResults: users },
    searchObjects: { objects: searchObjects },
  } = state;

  if (isSearchSO) {
    groups = [];
    searchObjects.forEach((el) => {
      if (el.isMarked) {
        groups = [...groups, ...el.groups];
      }
    });
  } else {
    groups = groups.map(el => (el.isMarked ? {
      isMarked: el.isMarked,
      id: el.id,
      name: el.name,
      photo_50: el.photo_50,
    } : null)).filter(el => el);
  }

  Object.keys(searchParams).forEach((el) => {
    if (Object.prototype.hasOwnProperty.call(searchParams, el) && !searchParams[el]) {
      delete searchParams[el];
    }
  });

  const dbObject = {
    info: {
      usersCount: users.length,
      groups,
      searchParams,
    },
    users: JSON.stringify(users),
  };

  const refKey = firebase.database().ref(`/users/${viewerId}/searchObjects`).push().key;
  const updates = {};
  updates[`/users/${viewerId}/searchObjects/users/${refKey}`] = dbObject.users;
  updates[`/users/${viewerId}/searchObjects/info/${refKey}`] = dbObject.info;
  firebase.database().ref().update(updates);

  dispatch({
    type: SAVE_OBJECT,
    btnSaveShow: false,
  });
};

export const addObject = (toggleModal, isSearchSO) => async (dispatch, getState) => {
  const {
    user: { vkInfo: { viewerId }, firebase },
  } = getState();
  let userInfo = await firebase.database().ref(`/users/${viewerId}/info`).once('value');
  userInfo = userInfo.val();

  let dateTo = userInfo && userInfo.dateTo;
  let dateNow = await vkApi('utils.getServerTime');
  dateNow = moment(dateNow.response, 'X');
  dateTo = moment(dateTo, 'X');

  if (dateNow.isBefore(dateTo)) {
    addObjectInDB(dispatch, getState, isSearchSO);
  } else {
    toggleModal();
  }
};

export const showOrderBoxModal = () => async (dispatch, getState) => {
  try {
    const result = await showOrderBox();
    if (result) {
      addObjectInDB(dispatch, getState);
      loadProfile(dispatch, getState);
    }
  } catch (e) {
    console.error(e);
  }
};

export const deleteObject = id => (dispatch, getState) => {
  const { firebase, vkInfo: { viewerId } } = getState().user;
  firebase.database().ref(`/users/${viewerId}/searchObjects/users/${id}`).remove();
  firebase.database().ref(`/users/${viewerId}/searchObjects/info/${id}`).remove();
};

export const updateSearchObjects = () => async (dispatch, getState) => {
  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { searchObjects: true },
  });
  dispatch({
    type: CLEAR_SEARCH_OBJECTS,
  });

  const { firebase, vkInfo: { viewerId } } = getState().user;
  firebase.database().ref(`users/${viewerId}/searchObjects/info`).on('value', (searchObjects) => {
    dispatch({
      type: CLEAR_SEARCH_OBJECTS,
    });

    const objects = [];
    const searchObjectsVal = searchObjects.val();
    Object.keys(searchObjectsVal).forEach((el) => {
      if (Object.prototype.hasOwnProperty.call(searchObjectsVal, el)) {
        objects.push({ ...searchObjectsVal[el], id: el });
      }
    });

    objects.forEach((el) => {
      dispatch({
        type: ADD_OBJECT,
        object: el,
      });
    });

    dispatch({
      type: TOGGLE_LOADING,
      loadingObj: { searchObjects: false },
    });
  });
};

export const markObject = id => ({
  type: MARK_OBJECT,
  id,
});

export const loadUsers = ({ id, city, ageFrom, ageTo,
  sex, groups, usersCount }) => async (dispatch, getState) => {
  dispatch({ type: CLEAR_USERS });

  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { sliceUsers: true },
  });

  const { user: { firebase, vkInfo: { viewerId } } } = getState();
  const url = `/users/${viewerId}/searchObjects/users/${id}`;
  let usersIds = await firebase.database().ref(url).once('value');
  usersIds = JSON.parse(usersIds.val());

  dispatch({
    type: SET_INFO_OBJECT_SEARCH,
    usersCount,
    groups,
    searchParams: { city, ageFrom, ageTo, sex, deepSearch: 'searchObjects' },
    searchResults: usersIds,
  });

  const resp = await vkApi('users.get', {
    user_ids: usersIds.slice(0, 20).join(','),
    fields: 'photo_100, followers_count',
  });
  const users = resp.response;

  dispatch({
    type: LOAD_SLICE_USERS_SUCCESS,
    users: users || [],
  });

  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { sliceUsers: false },
  });
};
