import React from 'react'
import { Route, IndexRoute, hashHistory } from 'react-router'
import Home from './home'
import Main from './main'
import Groups from './groups'
import SearchResults from './groups/search-results'

const redirect = (e) => {
  if(e.location.pathname === '/')
    hashHistory.push('/home');
};



const createRoutes = () => (
  <Route path='/' component={Main} onEnter={(e) => redirect(e)}>
    <Route path='home' component={Home}/>
    <Route path='groups' component={Groups}>
      <Route path='search-results' component={SearchResults}/>
    </Route>
    <Route path={'friends'} component={Groups}/>
  </Route>
);

export default createRoutes()