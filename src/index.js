import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { Provider } from 'react-redux'

import './redux/index'

import store from './redux/store/store'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
)

serviceWorker.unregister()
