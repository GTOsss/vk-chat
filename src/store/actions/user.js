import * as firebase from 'firebase';
import { testResponse, vkApi } from '../../services/vk-service';
import {
  UPDATE_GROUPS_FAIL,
  UPDATE_GROUPS_SUCCESS,
  UPDATE_SLICE_GROUPS_SUCCESS,
  MARK_GROUP,
  SELECT_GROUP,
  TOGGLE_LOADING,
  UPDATE_VK_INFO,
  INIT_FIREBASE,
  LOAD_PROFILE,
  TOGGLE_GROUP_CONNECT,
} from '../constans/index';

const getURLParam = require('get-url-param');

export const updateGroups = (userId, idMarkedGroups) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { groups: true },
  });

  const accessToken = getState().user.vkInfo.accessToken;

  VK.api('groups.get', {
    user_id: userId,
    extended: 1,
    filter: 0,
    fields: 'members_count',
    offset: 0,
    count: 100,
    version: 5.67,
    access_token: accessToken,
  }, (resp) => {
    try {
      testResponse(resp);
      const { response: { items } } = resp;

      if (idMarkedGroups && idMarkedGroups.length) {
        idMarkedGroups.forEach((el) => {
          for (let i = 0; i < items.length; i += 1) {
            if (items[i].id === el.id) {
              items[i].isMarked = true;
              items[i].timeMarked = el.timeMarked;
              break;
            }
          }
        });
      }

      dispatch({
        type: UPDATE_GROUPS_SUCCESS,
        groups: items,
      });
    } catch (e) {
      dispatch({ type: UPDATE_GROUPS_FAIL });
    }

    dispatch({
      type: TOGGLE_LOADING,
      loadingObj: { groups: false },
    });
  });
};

export const loadSliceGroups = (offset, count) => async (dispatch, getState) => {
  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { sliceGroups: true },
  });

  const { user: { vkInfo: { viewerId } } } = getState();
  const { response: { items } } = await vkApi('groups.get', {
    user_id: viewerId,
    extended: 1,
    filter: 0,
    fields: 'members_count',
    offset,
    count,
    version: 5.67,
  });

  dispatch({
    type: UPDATE_SLICE_GROUPS_SUCCESS,
    groups: items,
  });

  dispatch({
    type: TOGGLE_LOADING,
    loadingObj: { sliceGroups: false },
  });
};

export const markGroup = id => ({
  type: MARK_GROUP,
  idGroup: id,
});

export const selectGroup = id => ({
  type: SELECT_GROUP,
  idGroup: id,
});

export const connectGroupToggle = id => ({
  type: TOGGLE_GROUP_CONNECT,
  idGroup: id,
});

const getVkInfo = (dispatch) => {
  const vkInfo = {
    viewerId: getURLParam(frameHref, 'viewer_id'),
    viewerType: getURLParam(frameHref, 'viewer_type'),
    language: getURLParam(frameHref, 'language'),
    accessToken: getURLParam(frameHref, 'access_token'),
  };

  dispatch({
    type: UPDATE_VK_INFO,
    vkInfo,
  });
};

const initializeFirebase = (dispatch) => {
  const config = {
    apiKey: 'AIzaSyCcUm2_CN1k8v5tEgD36ie01Uirh7Xgq3Q',
    authDomain: 'vkchat-a2407.firebaseapp.com',
    databaseURL: 'https://vkchat-a2407.firebaseio.com',
    projectId: 'vkchat-a2407',
    storageBucket: 'vkchat-a2407.appspot.com',
    messagingSenderId: '780824054637',
  };

  firebase.initializeApp(config);

  dispatch({
    type: INIT_FIREBASE,
    firebase,
  });
};

export const loadProfile = async (dispatch, getState) => {
  const {
    user: { firebase: firebaseObj, vkInfo: { viewerId } },
  } = getState();

  let dateTo = await firebaseObj.database().ref(`/users/${viewerId}/info`).once('value');
  dateTo = dateTo.val();

  dispatch({
    type: LOAD_PROFILE,
    profile: dateTo,
  });
};

export const init = () => (dispatch, getState) => {
  getVkInfo(dispatch);
  initializeFirebase(dispatch);
  loadProfile(dispatch, getState);
};
