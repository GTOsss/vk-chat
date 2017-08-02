import {vkApi} from '../services/vkService'
import {intersectionArrays} from '../services/operations'
import {
  SEARCH_USERS_IN_GROUPS_USERS_START,
  SEARCH_USERS_IN_GROUPS_USERS_STEP,
  SEARCH_USERS_IN_GROUPS_USERS_FAIL,
  SEARCH_USERS_IN_GROUPS_USERS_SUCCESS
} from '../constans'

export const searchUsersInGroups = ({country, city, ageFrom, ageTo, sex, accessToken}) => {
  return async (dispatch, getState) => {
    const groups = getState().user.groups.filter((el) => el.isMarked);
    const length = groups.length;
    dispatch({
      type: SEARCH_USERS_IN_GROUPS_USERS_START,
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
        type: SEARCH_USERS_IN_GROUPS_USERS_STEP,
        step: i+1
      });

      searchResults.push(response.response.items);
    }

    searchResults = searchResults.reduce((a, b) => {
      return intersectionArrays(a, b);
    });

    dispatch({
      type: SEARCH_USERS_IN_GROUPS_USERS_SUCCESS,
      searchResults: searchResults
    });

    console.log(searchResults);
  }
};