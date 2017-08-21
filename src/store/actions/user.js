import {testResponse} from '../../services/vk-service'
import {levenshtein} from '../../services/operations'
import * as firebase from 'firebase'
let getURLParam = require('get-url-param');
import {
  UPDATE_GROUPS_REQUEST,
  UPDATE_GROUPS_FAIL,
  UPDATE_GROUPS_SUCCESS,
  MARK_GROUP,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAIL,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_VK_INFO,
  INIT_FIREBASE,
  GROUPS_FILTER
} from '../constans/index'

export const groupsFilter = (filterStr) => {
  return (dispatch, getState) => {
    if(filterStr === '') {
      let groups = getState().user.groups;
      let markedGroups = [];
      groups.forEach((el) => {
        if(el.isMarked) {
          markedGroups.push({
            id: el.id,
            timeMarked: el.timeMarked
          });
        }
      });

      dispatch({
        type: UPDATE_GROUPS_SUCCESS,
        groups: []
      });

      dispatch(updateGroups(getState().user.vkInfo.viewerId, markedGroups));
      return
    }

    let groups = getState().user.groups;
    groups.sort((a, b) => {
      let aIndex = a.name.toLowerCase().indexOf(filterStr.toLowerCase());
      let bIndex = b.name.toLowerCase().indexOf(filterStr.toLowerCase());
      return aIndex > bIndex ? -1 : 1
    });

    dispatch({
      type: UPDATE_GROUPS_SUCCESS,
      groups: groups
    });
  }
};

export const updateGroups = (userId, idMarkedGroups) => {
  return (dispatch) => {
    dispatch({type: UPDATE_GROUPS_REQUEST});
    VK.api('groups.get', {
      'user_id': userId,
      'extended': 1,
      'filter': 0,
      'fields': 'members_count',
      'offset': 0,
      'count': 999,
      'version': 5.67
    }, (resp) => {
      try {
        testResponse(resp);
        const {response: {items}} = resp;

        if (idMarkedGroups && idMarkedGroups.length) {
          idMarkedGroups.forEach((el) => {
            for(let i = 0; i < items.length; i++) {
              if(items[i].id === el.id) {
                items[i].isMarked = true;
                items[i].timeMarked = el.timeMarked;
                break;
              }
            }
          });
        }

        dispatch({
          type: UPDATE_GROUPS_SUCCESS,
          groups: items
        });
      }
      catch (e) {
        dispatch({type: UPDATE_GROUPS_FAIL})
      }
    });
  }
};

export const markGroup = (id) => ({
  type: MARK_GROUP,
  idGroup: id
});

export const getVkInfo = () => {
  return (dispatch) => {
    const vkInfo = {
      viewerId: getURLParam(frameHref, 'viewer_id'),
      viewerType:  getURLParam(frameHref, 'viewer_type'),
      language: getURLParam(frameHref, 'language'),
      accessToken: getURLParam(frameHref, 'access_token')
    };
    dispatch({
      type: UPDATE_VK_INFO,
      vkInfo: vkInfo
    });
  }
};

export const initializeFirebase = () => {
  return (dispatch) => {
    const config = {
      apiKey: "AIzaSyCcUm2_CN1k8v5tEgD36ie01Uirh7Xgq3Q",
      authDomain: "vkchat-a2407.firebaseapp.com",
      databaseURL: "https://vkchat-a2407.firebaseio.com",
      projectId: "vkchat-a2407",
      storageBucket: "vkchat-a2407.appspot.com",
      messagingSenderId: "780824054637"
    };

    firebase.initializeApp(config);

    dispatch({
      type: INIT_FIREBASE,
      firebase: firebase
    });
  }
};