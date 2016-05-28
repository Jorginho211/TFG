import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory as history } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { IntlProvider, addLocaleData } from 'react-intl'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MaterialUITheme from './styles/MaterialUITheme'

import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'
import gl from 'react-intl/locale-data/gl'

import { configureStore } from './store/configure'

import Routes from './containers/Router'

const store = configureStore({})
const syncHistory = syncHistoryWithStore(history, store)

injectTapEventPlugin()
addLocaleData(en)
addLocaleData(es)
addLocaleData(gl)

render(
    <Provider store={store}>
        <IntlProvider locale = 'en'>
            <MuiThemeProvider muiTheme={getMuiTheme(MaterialUITheme)}>
                <Router history = { syncHistory } routes = { Routes } />
            </MuiThemeProvider>
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
)
