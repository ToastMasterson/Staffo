import React from 'react'
import { render } from 'react-dom'

import App from './App'

import { Provider } from 'react-redux'
import createFirestoreInstance from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'


import './redux/index'
import firebase from './firebase'

import store from './redux/store/store'

import * as serviceWorker from './serviceWorker'

// const rrfProps = {
//     firebase,
//     config: firebase,
//     dispatch: store.dispatch,
//     createFirestoreInstance
// }

function Main(){
    return(
        <Provider store={store}>
            {/* <ReactReduxFirebaseProvider> */}
                <App />
            {/* </ReactReduxFirebaseProvider> */}
        </Provider>
    )
}

render(<Main/>, document.getElementById('root'))

serviceWorker.unregister()
