/**
 * Created by victorjose.gallego on 2/4/16.
 */

import LOGIN_ACTION_TYPES from './types/'

import config from '../../../../config.json'

export function usernameChange(username){
	return {type: LOGIN_ACTION_TYPES.USERNAME_CHANGE, payload: {username}}
}

export function passwordChange(password){
	return {type: LOGIN_ACTION_TYPES.PASSWORD_CHANGE, payload: {password}}
}

export function login(token){
	return {type: LOGIN_ACTION_TYPES.LOGIN, payload: {token}}
}

export function logout(){
	return {type: LOGIN_ACTION_TYPES.LOGOUT, payload: {}}	
}

export function loginError(){
	return {type: LOGIN_ACTION_TYPES.LOGIN_ERROR, payload: {}}	
}

export function requestLogin(username, password){
	return dispatch => {
		fetch('http://'+ config.host +':8080/MongoDBServices/api/v1/usuarios/login',{
			method: 'GET', 
			mode: 'cors',
			headers: {
    			'user': username,
    			'password': password,
    		},
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).then(json => {
			dispatch(login(json.token))
		}).catch( msg => {
			dispatch(loginError())
			console.log(msg)
		})
	}
}