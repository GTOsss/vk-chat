import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import createStore from './store/create-store';
import Routes from './routes';

import './style/main.scss';

const store = createStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{Routes}</Router>
  </Provider>,
  document.getElementById('root'),
);
