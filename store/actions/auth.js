
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTH = 'AUTH'
export const LOGOUT = 'LOGOUT'

let timer;

import { PROJECT_API_KEY } from '@env'

export const signup = (email,password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${PROJECT_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )

        if(!response.ok){
            const errorResData = await response.json()
            console.log(errorResData)
            const errorType = errorResData.error.message
            console.log(errorType)

            switch (errorType) {
                case 'EMAIL_EXISTS':
                    throw new Error('Email already registered')
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    throw new Error('Operation not allowed')
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    throw new Error('Too many register requests')
                    break;
                default:
                    throw new Error('Response not OK')
                    break;
            }
        }

        const resData = await response.json()
        console.log(resData)
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expDate = new Date(new Date().getTime() + (parseInt(resData.expiresIn) * 1000))
        saveToStorage(resData.idToken, resData.localId, expDate)
    }
}

export const login = (email,password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${PROJECT_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )

        if(!response.ok){
            const errorResData = await response.json()
            console.log(errorResData)
            const errorType = errorResData.error.message
            console.log(errorType)

            switch (errorType) {
                case 'EMAIL_NOT_FOUND':
                    throw new Error('Email not found')
                    break;
                case 'INVALID_PASSWORD':
                    throw new Error('Password invalid')
                    break;
                default:
                    throw new Error('Response not OK')
                    break;
            }
            
        }

        const resData = await response.json()
        console.log(resData)
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expDate = new Date(new Date().getTime() + (parseInt(resData.expiresIn) * 1000))
        saveToStorage(resData.idToken, resData.localId, expDate)
    }
}

export const logout = () => {
    clearTimer()
    AsyncStorage.removeItem('userData')
    return {type: LOGOUT}
}

const setLogoutTimer = (expTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        },expTime)
    }
    
}

const clearTimer = () => {
    if(timer) {
        clearTimeout(timer)
    }
}

export const authenticate = (userId, token, expTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expTime))
        dispatch({type: AUTH, userId, token})
    }
}

const saveToStorage = (token,userId, expDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expDate: expDate.toISOString()
    }))
}