import App from './App'
import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import About from '../../components/About'
import Home from '../../components/Home'
import NotFound from '../../components/NotFound'
import KPI from '../../components/KPI'
import Dashboard from '../../components/Dashboard'
//Import here the different components

export default (
    //Add routes here. ATTENTION: the 404 redirect should be the last defined route
    <Route path='/' component={App}>
        <IndexRoute component={KPI}/>
        <Route path='kpi' component={KPI} />
        <Route path='dashboard' component={Dashboard} />
        <Route path='about' component={About} />
        <Route path='about/:id/' component={About} />
        <Route path='404' component={NotFound} />
        <Redirect from='*' to='/404' />
    </Route>
)