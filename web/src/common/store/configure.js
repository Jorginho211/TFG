/* This file merely configures the store for hot reloading.
 * This boilerplate file is likely to be the same for each project that uses Redux.
 * With Redux, the actual stores are in ./reducers.
 */

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import allReducers from './reducers'

export function configureStore(initialState) {
    const reducers = combineReducers({
        ...allReducers,
        routing: routerReducer
    })

    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers/index')
            store.replaceReducer(nextReducer)
        });
    }

    return store;
}