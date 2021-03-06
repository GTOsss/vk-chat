import React from 'react';
import { Route, hashHistory } from 'react-router';
import Menu from './menu';
import Main from './main';
import Groups from './search';
import SearchResultsMenu from './menu/search-results';
import SearchResultsSearch from './search/search-results';
import Chat from './chat';

const redirect = (e) => {
  if (e.location.pathname === '/') { hashHistory.push('/menu'); }
};

const createRoutes = () => (
  <Route path="/" component={Main} onEnter={e => redirect(e)}>
    <Route path="menu" component={Menu}>
      <Route path="search-results" component={SearchResultsMenu} />
    </Route>
    <Route path="search" component={Groups}>
      <Route path="search-results" component={SearchResultsSearch} />
    </Route>
    <Route path="chat" component={Chat} />
  </Route>
);

export default createRoutes();
