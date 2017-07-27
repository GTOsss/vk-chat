import React from 'react'
import { Route, IndexRoute, hashHistory } from 'react-router'
import Home from './home'
import Main from './main'
import Groups from './groups'
let getURLParam = require('get-url-param');

const redirect = (e) => {
  if(e.location.pathname === '/')
    hashHistory.push('/home');
};

const vkInfo = {
  viewerId: getURLParam(window.location.href, 'viewer_id'),
  viewerType:  getURLParam(window.location.href, 'viewer_type'),
  language: getURLParam(window.location.href, 'language')
};

const createRoutes = () => (
  <Route path='/' component={Main} onEnter={(e) => redirect(e)}>
    <Route path='home' component={Home}  />
    <Route path='groups' component={Groups} vkInfo={vkInfo} />
    <Route path={'friends'} component={Groups} />
  </Route>
);

export default createRoutes()