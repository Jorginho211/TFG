/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
    stepIndex: 0,
    kpi: {},
    representation: {
        type: "line"
    },
    errors : {
        nameInput : false,
        descriptionInput : false,
        keywordsInput: false,
        timeInput: false, 
        selectFieldGraphicType: false,
    },
    isNewOrEditRepresentation: false,
    iframeOnceLoad: false,
}

export default function DatosKPIReducer(state = InitialState, {type = '', payload = {}} = {type : '', payload : { }}){
    switch (type){
        case TYPES.CONTINUE_STEP:
            return {
                ...state,
                stepIndex: state.stepIndex + 1,
            }

        case TYPES.SELECT_STEP:
            return {
                ...state,
                stepIndex: payload.step,
            }

        case TYPES.NAME_CHANGE:
            return {
                ...state,
                kpi: {
                    ...state.kpi,
                    name: payload.name,    
                }
            }

        case TYPES.KEYWORDS_CHANGE:
            return {
                ...state,
                kpi: {
                    ...state.kpi,
                    keywords: payload.keywords,    
                }
            }

        case TYPES.DESCRIPTION_CHANGE:
            return {
                ...state,
                kpi: {
                    ...state.kpi,
                    description: payload.description,    
                }
            }

        case TYPES.TIME_CHANGE:
            return {
                ...state,
                kpi: {
                    ...state.kpi,
                    time: payload.time,
                },
            }

        case TYPES.CODE_CHANGE:
            return {
                ...state,
                kpi: {
                    ...state.kpi,
                    code: payload.code,
                    variables: payload.variables,
                },
            }

        case TYPES.DELETE_DATA:
            return {
                ...state,
                kpi: {},
                representation: {
                    type:"line",
                },
                errors : {
                    nameInput : false,
                    descriptionInput : false,
                    keywordsInput: false,
                    timeInput: false, 
                },
                isNewOrEditRepresentation: false,
                iframeOnceLoad: false,
            }

        case TYPES.ADD_DATA:
            return {
                ...state,
                kpi: payload.kpi
            }

        case TYPES.REPRESENTATION_TYPE_CHANGE:
            return {
                ...state,
                representation : {
                    ...state.representation,
                    type: payload.type, 
                },
            }

        case TYPES.MAP_XAXYS_CHANGE:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    mapXAxis: payload.mapXAxis,
                },
            }

        case TYPES.MAP_YAXYS_CHANGE:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    mapYAxis: payload.mapYAxis
                },
            }

        case TYPES.LABEL_XAXYS_CHANGE:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    labelXAxis: payload.labelXAxis,
                },
            }

         case TYPES.LABEL_YAXYS_CHANGE:
            return {
                ...state,
                representation: {
                    ...state.representation,
                    labelYAxis: payload.labelYAxis,
                },
            }

        case TYPES.ADD_REPRESENTATION_TO_EDIT:
            return {
                ...state,
                representation : {
                    index: payload.index,
                    ...payload.representation,
                },
            }

        case TYPES.ADD_REPRESENTATION_TO_NEW:
            return {
                ...state,
                representation : {
                    type:"line",
                },
            }

        case TYPES.TOGGLE_REPRESENTATION_NEW_OR_EDIT:
            return {
                ...state,
                isNewOrEditRepresentation: !state.isNewOrEditRepresentation,
            }

        case TYPES.ADD_DELETE_REPRESENTATION_TO_KPI:
            return {
                ...state,
                kpi : payload.kpi,
            }

        case TYPES.MODIFY_ERRORS :
            return {
                ...state,
                errors : payload.errors,
            }

        case TYPES.IFRAME_ONCE_LOAD:
            return {
                ...state,
                iframeOnceLoad: payload.iframeOnceLoad,
            }

        default:
            return state
    }
}