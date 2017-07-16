import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from './Home'

export const createRoutes = () => (
  <Route path="/" component={Home}>
  </Route>
)

export default createRoutes()