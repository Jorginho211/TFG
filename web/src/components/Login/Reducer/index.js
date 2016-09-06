/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
	isAuthenticated: false,
    loginError: false,
}

export default function LoginReducer(state = InitialState, {type = '', payload = {}} = {type : '', payload : { }}){
    switch (type){
    	case TYPES.USERNAME_CHANGE:
    		return {
    			...state,
    			username: payload.username,
    		}

    	case TYPES.PASSWORD_CHANGE:
    		return {
    			...state,
    			password: payload.password,
    		}

    	case TYPES.LOGIN:
    		return {
    			...state,
    			token: payload.token,
    			isAuthenticated: true,
                loginError: false,
    		}

    	case TYPES.LOGOUT:
    		return {
    			...state,
    			token: undefined,
    			isAuthenticated: false,
    		}

        case TYPES.LOGIN_ERROR:
            return {
                ...state,
                loginError: true,
            }

        default:
            return state
    }
}