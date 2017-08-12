import {vkApi} from '../../services/vkService'
import {intersectionArrays} from '../../services/operations'
import {
  SEARCH_USERS_IN_GROUPS_START,
  SEARCH_USERS_IN_GROUPS_STEP,
  SEARCH_USERS_IN_GROUP_STEP,
  SEARCH_USERS_IN_GROUPS_FAIL,
  SEARCH_USERS_IN_GROUPS_SUCCESS
} from '../constans/index'

export const deepSearchInGroups = (accessToken) => {
  return async (dispatch, getState) => {
    const groups = getState().user.groups.filter((el) => el.isMarked);
    dispatch({
      type: SEARCH_USERS_IN_GROUPS_START,
      groupsCount: groups.length
    });

    let searchResults = [];
    for(let i = 0; i < groups.length; i++) {
      let countMembers = groups[i].members_count;
      let countRequest = Math.ceil(countMembers / 1000);
      let currentGroupMembers = [];
      const onePercent = (countRequest / 100);
      let counter = 0;
      let progress = 0;
      for(let j = 0; j <= countRequest; j++) {
        const response = await vkApi('groups.getMembers', {
          'fields': 'photo_100, photo_max_orig, online, last_seen, ' +
          'followers_count, city, about, relation, status',
          'access_token': accessToken,
          'offset': j * 1000,
          'count': 1000,
          'group_id': groups[i].id,
          'version': 5.67
        });

        if(counter >= onePercent) {
          counter = 0;
          progress = j / countRequest * 100;

          dispatch({
            type: SEARCH_USERS_IN_GROUP_STEP,
            progress
          });
        }
        counter++;

        currentGroupMembers = [...currentGroupMembers, ...response.response.items];
        console.log(countRequest);
      }
      searchResults.push(currentGroupMembers);

      dispatch({
        type: SEARCH_USERS_IN_GROUPS_STEP,
        step: i+1
      });
    }

    searchResults = searchResults.reduce((a, b) => {
      return intersectionArrays(a, b);
    });

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults: searchResults
    });
  }
};

export const searchUsersInGroups = ({country, city, ageFrom, ageTo, sex, accessToken}) => {
  return async (dispatch, getState) => {
    const groups = getState().user.groups.filter((el) => el.isMarked);
    const length = groups.length;
    dispatch({
      type: SEARCH_USERS_IN_GROUPS_START,
      groupsCount: length
    });

    let searchResults = [];
    for(let i = 0; i < length; i++) {
      const response = await vkApi('users.search', {
        'fields': 'photo_100, photo_max_orig, online, last_seen, ' +
        'followers_count, city, about, relation, status',
        'access_token': accessToken,
        'offset': 0,
        'count': 999,
        'country': country ? country : undefined,
        'city': city ? city : undefined,
        'sex': sex ? sex : undefined,
        'age_from': ageFrom ? ageFrom : undefined,
        'age_to': ageTo ? ageTo : undefined,
        'group_id': groups[i].id,
        'version': 5.67
      });

      dispatch({
        type: SEARCH_USERS_IN_GROUPS_STEP,
        step: i+1
      });

      searchResults.push(response.response.items);
    }

    searchResults = searchResults.reduce((a, b) => {
      return intersectionArrays(a, b);
    });

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_SUCCESS,
      searchResults: searchResults
    });
  }
};