/**
 * Created by victorjose.gallego on 2/4/16.
 */

import CODEWIZARD_ACTION_TYPES from './types/'

export function templateType(templateType){
	return {type: CODEWIZARD_ACTION_TYPES.TEMPLATE_TYPE, payload: {templateType}}
}

export function setWorkflowSugestion(state){
	return {type: CODEWIZARD_ACTION_TYPES.SET_WORKFLOW_SUGESTION, payload: {state}}
}

export function changeWorkflowVisibility(workflows, filter){
	workflows.map(workflow => {
		if(workflow.name.toLowerCase().match(filter.toLowerCase())){
			workflow.visibility = true
		}
		else {
			workflow.visibility = false
		}
	})

	return {type: CODEWIZARD_ACTION_TYPES.CHANGE_WORKFLOW_VISIBILITY, payload: {workflows}}
}

export function changeWorkflowState(state){
	return {type: CODEWIZARD_ACTION_TYPES.CHANGE_WORKFLOW_STATE, payload: {state}}
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