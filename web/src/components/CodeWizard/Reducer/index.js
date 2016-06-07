/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
	typeTemplate: 0,
    sugestionList: [],
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
        }
    ],
    errors : {
        workflowTemplateInput : false,
        tempWindowInput : false,
    },
}

export default function CodeWizardReducer(state = InitialState, {type = '', payload = {}} = {type : '', payload : { }}){
    switch (type){
    	case TYPES.TEMPLATE_TYPE:
    		return {
    			...state,
    			typeTemplate: payload.templateType,
    		}

        case TYPES.ÛPDATE_SUGESTION_LIST:
            return {
                ...state,
                sugestionList: payload.sugestionList,
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

        case TYPES.DELETE_DATA:
            return {
                ...state,
                typeTemplate: 0,
                sugestionList: [],
                workflowState: "started",
                workflowTemplate: undefined,
                errors : {
                    workflowTemplateInput : false,
                    tempWindowInput : false,
                },                
            }

        case TYPES.MODIFY_ERRORS :
            return {
                ...state,
                errors : payload.errors,
            }

        default:
            return state
    }
}