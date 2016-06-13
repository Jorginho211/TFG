/**
 * Created by victorjose.gallego on 2/4/16.
 */

import CODEWIZARD_ACTION_TYPES from './types/'

export function templateType(templateType){
	return {type: CODEWIZARD_ACTION_TYPES.TEMPLATE_TYPE, payload: {templateType}}
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
		workflowTemplate.map(item => {
			if(item.name === workflow.name){
				exist = true
			}
		})

		if(!exist){
			workflowTemplate[workflowTemplate.length] = {
				...workflow,
			}
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

export function changeSugestionList(sugestionList){
	return {type: CODEWIZARD_ACTION_TYPES.CHANGE_SUGESTION_LIST, payload: {sugestionList}}
}

export function addTaskToTaskTemplate(workflow, task, taskTemplate){
	let exist = false

	if(taskTemplate === undefined){
		taskTemplate = {
			name: workflow.name,
			tasks: [
				{
					...task,
				},
			],
		}
	}
	else {
		taskTemplate.tasks.map(item => {
			if(item.name === task.name){
				exist = true
			}
		})

		if(!exist){
			taskTemplate.tasks[taskTemplate.tasks.length] = {
				...task,
			}
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

export function cleanTaskTemplate() {
	let sugestionList = ["Usuarios", "Conexions"]
	
	return {type: CODEWIZARD_ACTION_TYPES.CLEAN_TASK_TEMPLATE, payload: {sugestionList}}
}