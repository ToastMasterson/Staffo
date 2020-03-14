import { combineReducers } from 'redux'
import authReducer from  './auth'
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import employees from './employees'

const rootReducer = combineReducers({ firebaseReducer, firestoreReducer, authReducer, employees })

export default rootReducer