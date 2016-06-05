/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
	typeTemplate: 0,
    workflowSugestion: false,
    workflowState: "started",
    workflows : [
        {
            name: "Usuarios",
            tasks: [
                {
                    id: 0,
                    name: "Proba1"
                },
                {
                    id: 1,
                    name: "Proba2",
                },
            ],
            visibility: true,
        },
        {
            name: "Conexions",
            tasks: [
                {
                    id: 2,
                    name: "Proba3"
                },
                {
                    id: 3,
                    name: "Proba4",
                },
            ],
            visibility: true,
        }
    ],
}

export default function CodeWizardReducer(state = InitialState, {type = '', payload = {}} = {type : '', payload : { }}){
    switch (type){
    	case TYPES.TEMPLATE_TYPE:
    		return {
    			...state,
    			typeTemplate: payload.templateType,
    		}

        case TYPES.SET_WORKFLOW_SUGESTION:
            return {
                ...state,
                workflowSugestion: payload.state,
            }

        case TYPES.CHANGE_WORKFLOW_VISIBILITY:
            return {
                ...state,
                workflows: payload.workflows,
            }

        case TYPES.CHANGE_WORKFLOW_STATE:
            return {
                ...state,
                workflowState: payload.state,
            }

        case TYPES.ADD_DELETE_WORKFLOW_TO_WORKFLOW_TEMPLATE:
            return {
                ...state,
                workflowTemplate: payload.workflowTemplate,
                workflowState: "started",
            }

        case TYPES.CHANGE_TIME_WINDOW:
            return {
                ...state,
                timeWindow: payload.timeWindow,
            }

        default:
            return state
    }
}