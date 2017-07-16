import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers';

export default () => createStore(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk));