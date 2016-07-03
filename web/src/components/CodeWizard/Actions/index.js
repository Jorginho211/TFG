/**
 * Created by victorjose.gallego on 2/4/16.
 */

import CODEWIZARD_ACTION_TYPES from './types/'

export function templateType(templateType, codeTemplate){
	return {type: CODEWIZARD_ACTION_TYPES.TEMPLATE_TYPE, payload: {templateType, codeTemplate}}
}

export function changeTaskWorkflowState(state){
	return {type: CODEWIZARD_ACTION_TYPES.CHANGE_TASK_WORKFLOW_STATE, payload: {state}}
}

export function addWorkflowToWorkflowTemplate(workflow, workflowTemplate){
	let exist = false
	if(workflowTemplate === undefined){
		workflowTemplate = [
			{
				...workflow,
			},
		]
	}
	else {
		workflowTemplate[workflowTemplate.length] = {
			...workflow,
		}	
	}

	return {type: CODEWIZARD_ACTION_TYPES.ADD_DELETE_WORKFLOW_TO_WORKFLOW_TEMPLATE, payload: {workflowTemplate}}
}

export function deleteWorkflowToWorkflowTemplate(workflowTemplate,index){
	workflowTemplate.pop(index)

	if(workflowTemplate.length === 0){
		workflowTemplate = undefined
	}

	return {type: CODEWIZARD_ACTION_TYPES.ADD_DELETE_WORKFLOW_TO_WORKFLOW_TEMPLATE, payload: {workflowTemplate}}
}

export function changeTimeWindow(timeWindow){
	return {type: CODEWIZARD_ACTION_TYPES.CHANGE_TIME_WINDOW, payload: {timeWindow}}
}

export function deleteData(){
	return {type: CODEWIZARD_ACTION_TYPES.DELETE_DATA, payload: {}}
}

export function modifyErrors(errors){
	return {type: CODEWIZARD_ACTION_TYPES.MODIFY_ERRORS, payload: {errors}}
}

export function changeSuggestionList(suggestionList){
	return {type: CODEWIZARD_ACTION_TYPES.CHANGE_SUGGESTION_LIST, payload: {suggestionList}}
}

export function cleanTaskTemplate() {	
	return {type: CODEWIZARD_ACTION_TYPES.CLEAN_TASK_TEMPLATE, payload: {}}
}

export function setWorkflows(workflows){
	return {type: CODEWIZARD_ACTION_TYPES.SET_WORKFLOWS, payload: {workflows} }
}

export function addTaskToTaskTemplate(workflow, task, taskTemplate){
	let exist = false

	if(taskTemplate === undefined){
		taskTemplate = {
			...workflow,
			tasks: [
				{
					...task,
				},
			],
		}
	}
	else {
		taskTemplate.tasks[taskTemplate.tasks.length] = {
			...task,
		}		
	}

	return {type: CODEWIZARD_ACTION_TYPES.ADD_DELETE_TASK_TO_TASK_TEMPLATE, payload: {taskTemplate}}
}

export function deleteTaskToTaskTemplate(taskTemplate, index) {
	taskTemplate.tasks.pop(index)

	if(taskTemplate.tasks.length === 0){
		taskTemplate.tasks = undefined
	}

	return {type: CODEWIZARD_ACTION_TYPES.ADD_DELETE_TASK_TO_TASK_TEMPLATE, payload: {taskTemplate}}
}

export function setCodeTemplates(codeTemplates){
	return {type: CODEWIZARD_ACTION_TYPES.SET_CODE_TEMPLATES, payload: {codeTemplates} }
}

export function requestCodeTemplates(){
	return dispatch => {
		fetch('http://localhost:8080/MongoDBServices/api/v1/codetemplates',{
			method: 'GET', 
			mode: 'cors'
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).then(json => {
			dispatch(setCodeTemplates(json))
		}).catch( msg => 
			console.log(msg)
		)
	}
}

export function toggleLoading(){
	return {type: CODEWIZARD_ACTION_TYPES.TOGGLE_LOADING, payload: {} }
}


//Servizos externos CITIUS
export function authenticationCITIUS(){
	return dispatch => {
		dispatch(toggleLoading())

		fetch('https://tec.citius.usc.es/cuestionarios/backend/HMBAuthenticationRESTAPI/auth/login?username=manuel&password=pass',{
			method: 'GET', 
			mode: 'cors'
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).then(json => {
			dispatch(tokenAutentication(json.content))
			dispatch(requestListWorkflows(json.content))
		}).catch( msg => 
			console.log(msg)
		)
	}
}

export function tokenAutentication(token){
	return {type: CODEWIZARD_ACTION_TYPES.TOKEN_AUTHENTICATION, payload: {token} }
}

export function requestListWorkflows(token){
	return dispatch => {
		fetch('https://tec.citius.usc.es/cuestionarios/backend/HMBOntologyRESTAPI/api/admin/v3/workflows/page/0/size/1000?provider=es.usc.citius.hmb.questionnaires',{
			method: 'GET', 
			mode: 'cors',
    		headers: { 
    			'X-Auth-Token': token 
    		}
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).then(json => {
			dispatch(requestTaskWorkflows(json.content.result, token))
		}).catch( msg => 
			console.log(msg)
		)
	}
}

export function requestTaskWorkflows(workflows, token){
	let workflowsState = []
	let suggestionList = []

	workflows.map( wf => {
		workflowsState.push({
			name: wf.name,
			URI: wf.URI
		})

		suggestionList.push(wf.name)
	})

	workflowsState.map( wf => {
		fetch('https://tec.citius.usc.es/cuestionarios/backend/HMBOntologyRESTAPI/api/admin/v3/workflow/' + wf.URI,{
			method: 'GET', 
			mode: 'cors',
			async: false,
			headers: { 
    			'X-Auth-Token': token 
    		}
		}).then(response => {
			return response.ok ? 
				response.json() :
				Promise.reject("Erro")
		}).then(json => {
			let tasks = []

			json.content.element.map ( task => {

				if(task.operator !== null && (task.operator.wfontology_Name === "start" || task.operator.wfontology_Name === "finish")){
					tasks.push({
						name: ( task.wfontology_Name ? task.wfontology_Name : "null" ),
						URI: task.uri,
						dummyTaskType: task.operator.wfontology_Name,
					})
				}
				else{
					tasks.push({
						name: ( task.wfontology_Name ? task.wfontology_Name : "null" ),
						URI: task.uri,
					})
				}
			})

			wf.tasks = tasks;
		}).catch( msg => 
			console.log(msg)
		)
	})

	return dispatch => {
		dispatch(setWorkflows(workflowsState)),
		dispatch(changeSuggestionList(suggestionList))
		dispatch(toggleLoading())
	}
}