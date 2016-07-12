/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
	typeTemplate: 0,
    suggestionList: [],
    taskWorkflowState: "active",
    errors : {
        workflowTemplateInput : false,
        tempWindowInput : false,
    },
    isLoading: false,
    code: "import com.twitter.scalding._\r\nimport java.io.File\r\nimport com.github.nscala_time.time.Imports._\r\n \r\nclass %%KPINAME%%(args : Args) extends Job(args) {\r\n  def getLogFiles(dir: String): List[File] = {\r\n    val files = new File(dir)\r\n    files.listFiles.toList\r\n  }\r\n  \r\n  def getFilesTypeFilesTimeWindow(timestamp: Long, typeFile: String):List[String] = {\r\n    getLogFiles(\"/home/xurxo/logs\").filter( (file: File) => {\r\n      (file.getName.split(\"\\\\.\")(1).toLong >= DateTime.now.getMillis - timestamp && file.getName.split(\"\\\\.\")(1).toLong <= DateTime.now.getMillis && file.getName.split(\"\\\\.\")(0).contains(typeFile))\r\n    })\r\n    .map((file: File) => file.getCanonicalPath)\r\n  }\r\n  \r\n  val files = getFilesTypeFilesTimeWindow(%%TIMEWINDOW%%L, \"tscev\")\r\n  \r\n  %%CODEBASE%%\r\n}"
}

export default function CodeWizardReducer(state = InitialState, {type = '', payload = {}} = {type : '', payload : { }}){
    switch (type){
    	case TYPES.TEMPLATE_TYPE:
    		return {
    			...state,
    			typeTemplate: payload.templateType,
                codeTemplate: payload.codeTemplate,
    		}

        case TYPES.CHANGE_TASK_WORKFLOW_STATE:
            return {
                ...state,
                taskWorkflowState: payload.state,
            }

        case TYPES.ADD_DELETE_WORKFLOW_TO_WORKFLOW_TEMPLATE:
            return {
                ...state,
                workflowTemplate: payload.workflowTemplate,
                taskWorkflowState: "active",
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
                taskWorkflowState: "active",
                workflowTemplate: undefined,
                taskTemplate: undefined,
                errors : {
                    workflowTemplateInput : false,
                    tempWindowInput : false,
                },
                codeTemplate: undefined,                
            }

        case TYPES.MODIFY_ERRORS :
            return {
                ...state,
                errors : payload.errors,
            }

        case TYPES.CHANGE_SUGGESTION_LIST:
            return {
                ...state,
                suggestionList: payload.suggestionList,
            }

        case TYPES.ADD_DELETE_TASK_TO_TASK_TEMPLATE:
            return {
                ...state,
                taskTemplate: payload.taskTemplate,
                taskWorkflowState: "active",
            }

        case TYPES.CLEAN_TASK_TEMPLATE:
            return {
                ...state,
                taskTemplate: undefined,
                taskWorkflowState: "active",
            }

        case TYPES.SET_CODE_TEMPLATES:
            return {
                ...state,
                codeTemplates: payload.codeTemplates,
            }

        case TYPES.TOKEN_AUTHENTICATION:
            return {
                ...state,
                token: payload.token,
            }

        case TYPES.SET_WORKFLOWS:
            return {
                ...state,
                workflows: payload.workflows,
            }

        case TYPES.TOGGLE_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            }

        default:
            return state
    }
}