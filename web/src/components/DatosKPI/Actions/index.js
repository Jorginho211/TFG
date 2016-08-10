/**
 * Created by victorjose.gallego on 2/4/16.
 */

import DATOSKPI_ACTION_TYPES from './types/'

import { toggleDialog } from '../../KPI/Actions/index.js'
import { toggleLoading } from '../../KPI/Actions/index.js'
import { requestKpis } from '../../KPI/Actions/index.js'

//STEEPER
export function continueSteper(){
	return {type: DATOSKPI_ACTION_TYPES.CONTINUE_STEP}
}

export function selectStepSteper(step){
	return {type: DATOSKPI_ACTION_TYPES.SELECT_STEP, payload: {step}}
}


//AÑADIR DATOS BASICOS
export function nameChange(name){
	return {type: DATOSKPI_ACTION_TYPES.NAME_CHANGE, payload: {name}}
}

export function keywordsChange(keywords){
	return {type: DATOSKPI_ACTION_TYPES.KEYWORDS_CHANGE, payload: {keywords}}
}

export function descriptionChange(description){
	return {type: DATOSKPI_ACTION_TYPES.DESCRIPTION_CHANGE, payload: {description}}
}

export function timeChange(time){
	return {type: DATOSKPI_ACTION_TYPES.TIME_CHANGE, payload: {time : parseInt(time)}}
}

export function codeChange(code){
	let reg = /.rename(\(|\s)+('[_a-zA-Z0-9]+|\s*,\s*)+(\)|\s)+->(\s|\()+('[_a-zA-Z0-9]+|\s*,\s*)+(\)|\s)+/;
	let columns = reg.exec(code);

	if(columns !== null){
		let variables = []
		let column = columns[0].split("->")[1].split(",");

		reg = reg = /[_A-Za-z0-9]+/;

		column.map(el => {
			variables.push(reg.exec(el)[0])
		})

		return {type: DATOSKPI_ACTION_TYPES.CODE_CHANGE, payload: {code, variables}}
	}

	return {type: DATOSKPI_ACTION_TYPES.CODE_CHANGE, payload: {code}}
}

//EDICION/ADICION/ELIMINACION REPRESENTACIONS
export function representationTypeChange(type) {
	return {type: DATOSKPI_ACTION_TYPES.REPRESENTATION_TYPE_CHANGE, payload: {type}}
}

export function mapXAxisChange(mapXAxis) {
	return {type: DATOSKPI_ACTION_TYPES.MAP_XAXYS_CHANGE, payload: {mapXAxis}}
}

export function mapYAxisChange(mapYAxis) {
	return {type: DATOSKPI_ACTION_TYPES.MAP_YAXYS_CHANGE, payload: {mapYAxis}}
}

export function labelXAxisChange(labelXAxis) {
	return {type: DATOSKPI_ACTION_TYPES.LABEL_XAXYS_CHANGE, payload: {labelXAxis}}
}

export function labelYAxisChange(labelYAxis) {
	return {type: DATOSKPI_ACTION_TYPES.LABEL_YAXYS_CHANGE, payload: {labelYAxis}}
}

export function toggleRepresentationNewOrEdit(){
	return {type: DATOSKPI_ACTION_TYPES.TOGGLE_REPRESENTATION_NEW_OR_EDIT, payload: {}}
}

export function addRepresentationToEdit(representation, index){
	return {type: DATOSKPI_ACTION_TYPES.ADD_REPRESENTATION_TO_EDIT, payload: {representation, index}}
}

export function addRepresentationToNew(){
	return {type: DATOSKPI_ACTION_TYPES.ADD_REPRESENTATION_TO_NEW, payload: {}}
}

export function addRepresentationToKPI(kpi, representation){
	if(kpi.representation !== undefined){
		let exist = false
		kpi.representation.map( (repr, index) => {
			if(repr.type === representation.type){
				kpi.representation[index] = representation
				exist = true
			}
		})

		if(exist === false){
			if(representation.index !== undefined){
				kpi.representation[representation.index] = {
					...representation,
					index: undefined,
				}
			}
			else {
				kpi.representation[kpi.representation.length] = {
					...representation
				}
			}
		}
	}
	else{
		kpi.representation = [{
			...representation
		}]
	}

	return {type: DATOSKPI_ACTION_TYPES.ADD_DELETE_REPRESENTATION_TO_KPI, payload: {kpi}}
}

export function deleteRepresentation(kpi,index){
	let representations = []

	kpi.representation.map( (repr, i) => {
		if(i !== index){
			representations.push(repr)
		}
	})

	kpi.representation = representations

	if(kpi.representation.length === 0){
		kpi.representation = undefined
	}

	return {type: DATOSKPI_ACTION_TYPES.ADD_DELETE_REPRESENTATION_TO_KPI, payload: {kpi}}
}

export function setProperties(properties){
	return {type: DATOSKPI_ACTION_TYPES.SET_PROPERTIES, payload: {properties}}
}

//AÑADIR/ELIMINAR ESTADO KPI CONCRETA
export function deleteData(){
	return {type: DATOSKPI_ACTION_TYPES.DELETE_DATA}
}

export function addData(kpi){
	return {type: DATOSKPI_ACTION_TYPES.ADD_DATA, payload: {kpi}}
}

//DATABASE
export function storeKPIBD(kpi, methodType){
	kpi.visibility = undefined;

	return dispatch => {
		fetch('http://localhost:8080/MongoDBServices/api/v1/kpis/',{
			method: methodType, 
			mode: 'cors',
			headers: new Headers({'Content-Type': 'application/json',}),
			body: JSON.stringify(kpi),
		}).then(response => {
			return response.ok ? 
				response.ok :
				Promise.reject("Erro")
		}).then(reponse => {
			dispatch(requestKpis())
			dispatch(toggleDialog())
		}).catch( msg => 
			console.log(msg)
		)
	}
}

export function sendJobHadoop(code){
	return dispatch => {
		fetch('http://localhost:8080/HadoopServices/api/v1/sendjob/',{
			method: 'POST', 
			mode: 'cors',
			headers: new Headers({'Content-Type': 'application/json',}),
			body: code,
		}).then(response => {
			return response.ok
		}).catch( msg => 
			console.log(msg)
		)
	}
}

export function getPropertiesBD(){
	return dispatch => {
		fetch('http://localhost:8080/MongoDBServices/api/v1/properties',{
			method: 'GET', 
			mode: 'cors'
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).then(json => {
			dispatch(setProperties(json.properties))
		}).catch( msg => 
			console.log(msg)
		)
	}
}

//MOSTRAR ERROS
export function modifyErrors(errors){
	return {type: DATOSKPI_ACTION_TYPES.MODIFY_ERRORS, payload: {errors}}
}

export function iframeOnceLoad(iframeOnceLoad){
	return {type: DATOSKPI_ACTION_TYPES.IFRAME_ONCE_LOAD, payload: {iframeOnceLoad}}
}