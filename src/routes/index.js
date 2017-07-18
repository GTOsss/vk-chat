import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from './home'
import Main from './main'

export const createRoutes = () => (
  <Route path="/" component={Main}>
    <Route path="home" component={Home} />
  </Route>
)

export default createRoutes()