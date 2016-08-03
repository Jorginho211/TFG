/**
 * Created by victorjose.gallego on 2/4/16.
 */
import DASHBOARD_ACTION_TYPES from './types/'

export function toggleLoading(){
	return {type: DASHBOARD_ACTION_TYPES.TOGGLE_LOADING}
}


export function addRemoveElement(dashboard){
    return {type: DASHBOARD_ACTION_TYPES.ADD_REMOVE_ELEMENT_LAYOUT, payload: { dashboard }}
}

export function saveLayout(layout){
    return {type: DASHBOARD_ACTION_TYPES.SAVE_LAYOUT, payload: { layout }}
}

export function toggleDialog(){
	return {type: DASHBOARD_ACTION_TYPES.TOGGLE_DIALOG, payload: { }}
}

export function updateSuggestionList(suggestionList){
	return {type: DASHBOARD_ACTION_TYPES.UPDATE_SUGGESTION_LIST, payload: { suggestionList }}
}

export function setKPI(kpi){
	return {type: DASHBOARD_ACTION_TYPES.SET_KPI, payload: { kpi }}
}

export function requestDataKPI(idKPI, dashboard){
	return dispatch => {
		fetch('http://localhost:8080/MongoDBServices/api/v1/kpi/hadoopdata/' + idKPI,{
			method: 'GET', 
			mode: 'cors',
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).then(json => {
		 	let dashboardAux = []

		 	dashboard.map( d => {
		 		if(d.idkpi !== idKPI){
		 			dashboardAux.push(d);
		 		}else{
		 			dashboardAux.push({
		 				...d,
		 				data: json,
		 			})
		 		}
		 	})

		 	dispatch(addRemoveElement(dashboardAux))
		}).catch( msg => 
			console.log(msg)
		)
	}
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
			json.map(l => {
				dispatch(requestDataKPI(l.idkpi, json))
			})
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
			return response.ok
		}).catch( msg => 
			console.log(msg)
		)
	}
}