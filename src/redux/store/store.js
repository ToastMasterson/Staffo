import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/index'
import reduxThunk from 'redux-thunk'

import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from '../../firebase'

const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(
    createStore
)

const store = createStoreWithFirebase(
    rootReducer,
    {},
    applyMiddleware(reduxThunk)
)

export default store