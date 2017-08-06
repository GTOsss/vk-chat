import React from 'react'
import { Route, IndexRoute, hashHistory } from 'react-router'
import Menu from './menu'
import Main from './main'
import Groups from './search'
import SearchResults from './search/search-results'

const redirect = (e) => {
  if(e.location.pathname === '/')
    hashHistory.push('/menu');
};

const createRoutes = () => (
  <Route path='/' component={Main} onEnter={(e) => redirect(e)}>
    <Route path='home' component={Menu}/>
    <Route path='search' component={Groups}>
      <Route path='search-results' component={SearchResults}/>
    </Route>
  </Route>
);

export default createRoutes()