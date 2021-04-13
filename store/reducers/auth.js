import { SIGNUP, LOGIN } from "../actions/auth";

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            }
            
        break;

        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            }
        break;
        
        default:
            return state
    }
}