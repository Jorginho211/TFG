/**
 * Created by victorjose.gallego on 2/4/16.
 */
import KPI_ACTION_TYPES from './types/'

export function toggleDialog(){
    return {type: KPI_ACTION_TYPES.TOGGLE_DIALOG}
}

export function toggleLoading(){
	return {type: KPI_ACTION_TYPES.TOGGLE_LOADING}
}

export function filter(kpis, filter, filterType){
	kpis.map(kpi => {
		if(kpi.name.toLowerCase().match(filter.toLowerCase()) || kpi.keywords.toLowerCase().match(filter.toLowerCase()) || kpi.description.toLowerCase().match(filter.toLowerCase())){
			kpi.visibility = true
		}
		else{
			kpi.visibility = false
		}
	})

	return {type: KPI_ACTION_TYPES.SET_KPIS, payload: {kpis}}
}

export function setKpis(kpis){
	kpis.map(kpi => {
		kpi.visibility = true;
	})

	return {type: KPI_ACTION_TYPES.SET_KPIS, payload: {kpis}}
}

export function requestKpis(){
	return dispatch =>
		fetch('http://localhost:8080/MongoDBServices/api/v1/kpis/',{
			method: 'GET', 
			mode: 'cors'
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).then(json => {
			dispatch(setKpis(json))
			dispatch(toggleLoading())
		}).catch( msg => 
			console.log(msg)
		)
}

export function deleteKPI(id){
	return dispatch => {
		dispatch(toggleLoading())

		fetch('http://localhost:8080/MongoDBServices/api/v1/kpis/kpi/' + id,{
			method: 'DELETE', 
			mode: 'cors'
		}).then(response => {
			return response.ok ? 
				response :
				Promise.reject("Erro")
		}).then(response => {
			dispatch(requestKpis())
		}).catch( msg => 
			console.log(msg)
		)
	}
}

export function newKPI(isNew){
	return {type: KPI_ACTION_TYPES.NEW_KPI, payload: {isNew}}
}