/**
 * Created by victorjose.gallego on 2/4/16.
 */
import DASHBOARD_ACTION_TYPES from './types/'

export function addRemoveElement(dashboard){
    return {type: DASHBOARD_ACTION_TYPES.ADD_REMOVE_ELEMENT_LAYOUT, payload: { dashboard }}
}

export function saveLayout(layout){
    return {type: DASHBOARD_ACTION_TYPES.SAVE_LAYOUT, payload: { layout }}
}

export function requestDashboard(token){
	return dispatch => {
		fetch('http://localhost:8080/MongoDBServices/api/v1/usuarios/dashboard/',{
			method: 'GET', 
			mode: 'cors',
    		headers: { 
    			'X-Auth-Token': token,
    		}
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).then(json => {
			dispatch(addRemoveElement(json))
		}).catch( msg => 
			console.log(msg)
		)
	}
}

export function putDashboard(token, dashboard){
	return dispatch => {
		fetch('http://localhost:8080/MongoDBServices/api/v1/usuarios/dashboard/',{
			method: 'PUT', 
			mode: 'cors',
    		headers: { 
    			'X-Auth-Token': token,
    			'Content-Type': 'application/json',
    		},
    		body: JSON.stringify({ dashboard: dashboard }),
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).catch( msg => 
			console.log(msg)
		)
	}
}