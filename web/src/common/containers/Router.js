import App from './App'
import React from 'react'
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'

import About from '../../components/About'
import Home from '../../components/Home'
import NotFound from '../../components/NotFound'
import KPI from '../../components/KPI'
import Dashboard from '../../components/Dashboard'
import Login from '../../components/Login'
import Layout from '../../components/Layout'

//Import here the different components

export default (
    //Add routes here. ATTENTION: the 404 redirect should be the last defined route
    <Route path='/' component={App}>
        <IndexRedirect to='login'  />
        <Route path='login' component={Login} />
        <Route path='app' component={Layout}>
            <IndexRedirect to='kpi' />
            <Route path = 'kpi' component = { KPI } />
            <Route path='dashboard' component={Dashboard} />
            <Route path='404' component={NotFound} />
        </Route>
        <Redirect from='*' to='/404' />
    </Route>


)