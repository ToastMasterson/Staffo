import { combineReducers } from 'redux'
import authReducer from  './auth'
import { firebaseReducer } from 'react-redux-firebase'
import employees from './employees'

const rootReducer = combineReducers({ firebaseReducer, authReducer, employees })

export default rootReducer