import {
  UPDATE_COUNTRY_REQUEST,
  UPDATE_COUNTRY_SUCCESS,
  UPDATE_COUNTRY_FAIL
} from '../actions/search-form'

const initialState = {
  isLoadingCountries: false,
  isLoadingCities: false,
  countries: [],
  cities: []
};

export default function searchForm(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COUNTRY_REQUEST:
      return {...state, countries: [...state.countries], isLoadingCountries: true};
    case UPDATE_COUNTRY_SUCCESS:
      return {...state, countries: [...action.countries], isLoadingCountries: false};
    case UPDATE_COUNTRY_FAIL:
      return {...state, countries: [...state.countries],isLoadingCountries: false};
    default:
      return state
  }
}