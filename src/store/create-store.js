import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk';
import reducers from './reducers';
import {routerReducer} from 'react-router-redux'

export default () => createStore(
  combineReducers({...reducers, form: formReducer, routing: routerReducer}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk));
