export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'


import { PROJECT_API_KEY } from 'react-native-dotenv'

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
        dispatch({type: SIGNUP, token: resData.idToken , userId: resData.localId })
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
        dispatch({type: LOGIN, token: resData.idToken , userId: resData.localId})
    }
}