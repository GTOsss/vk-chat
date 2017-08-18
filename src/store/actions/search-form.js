import {testResponse} from '../../services/vk-service'
import {formValueSelector} from 'redux-form'
import {
  UPDATE_COUNTRY_REQUEST,
  UPDATE_COUNTRY_SUCCESS,
  UPDATE_COUNTRY_FAIL
} from '../constans/index'

export const updateCountries = () => {
  return (dispatch, getState) => {
    const {countries} = getState().searchForm;
    if(countries && (countries.length > 2)) {
      return
    }

    dispatch({type: UPDATE_COUNTRY_REQUEST});
    VK.api('database.getCountries', {
      'need_all': 1,
      'offset': 0,
      'count': 999,
      'version': 5.67
    }, (resp) => {
      try{
        testResponse(resp);
        const {response: {items}} = resp;
        const countries = items.map((el)=> ({value: el.id, label: el.title}));
        countries.sort((a, b) => {
          if(a.value > b.value) return 1;
          if(a.value < b.value) return -1;
        });
        dispatch({
          type: UPDATE_COUNTRY_SUCCESS,
          countries: countries
        });
      }
      catch(e) {
        dispatch({type: UPDATE_COUNTRY_FAIL})
      }
    });
  }
};

export const updateCities = (input, callback) => {
  return (dispatch, getState) => {
    const selector = formValueSelector('searchParams');
    const values = selector(getState(), 'country', 'city');
    if(!(values && values.country && input)) {
      callback(null, {options: [], complete: true});
      return
    }
    VK.api('database.getCities', {
      'country_id': values.country,
      'q': input,
      'need_all': 1,
      'offset': 0,
      'count': 999,
      'version': 5.67
    }, (resp) => {
      try{
        testResponse(resp);
        const {response: {items}} = resp;
        const cities = items.map((el) => ({value: el.id, label: el.title}));
        cities.sort((a, b) => {
          if(a.value > b.value) return 1;
          if(a.value < b.value) return -1;
        });
        callback(null, {options: cities, complete: true});
      }
      catch(e) {
      }
    });
  }
};
