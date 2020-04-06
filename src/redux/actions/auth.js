import { SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNIN_PENDING, SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNOUT_PENDING, SIGNOUT_ERROR, SIGNOUT_SUCCESS, SIGNUP_PENDING } from '../constants/action-types'

import firebase from '../../firebase'

export const signup = (email, password) => async dispatch => {
    try {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(dataBeforeEmail =>  {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user.emailVerified) {
                        dispatch({
                            type: SIGNUP_SUCCESS,
                            payload: "Your account was successfully created! Please verify your e-mail address in the e-mail we just sent to you."
                        })
                    } else {
                        dispatch({
                            type: SIGNUP_ERROR,
                            payload: "Something went wrong. Please try again."
                        })
                    }
                })
            })
            .catch(function(error) {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: "Something went wrong. Please try again."
                })
            })
    } catch (err) {
        dispatch({
            type: SIGNUP_ERROR,
            payload: "Something went wrong. Please try again."
        })
    }
}

export const signin = (email, password, callback) => async dispatch => {
    try {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch({ type: SIGNIN_SUCCESS })
            })
            .catch(() => {
                dispatch({
                    type: SIGNIN_ERROR,
                    payload: "Invalid login credentials"
                })
            })
        } catch (err) {
            dispatch({ type: SIGNIN_ERROR, payload: "Invalid login credentials" })
        }
}

export const signout = () => async dispatch => {
    try {
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: SIGNOUT_SUCCESS })
            })
            .catch(() => {
                dispatch({ 
                    type: SIGNOUT_ERROR, 
                    payload: "There was an issue signing out."
                })
            })
        } catch (err) {
            dispatch({ 
                type: SIGNOUT_ERROR, 
                payload: "There was an issue signing out."
            })
    }
}