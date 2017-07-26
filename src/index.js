import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory, Router } from 'react-router'
import createStore from './store/create-store'
import Routes from './routes'

import 'bootstrap/dist/css/bootstrap.min.css'

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} children={Routes} />
  </Provider>,
  document.getElementById('root')
);
