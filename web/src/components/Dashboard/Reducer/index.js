/**
 * Created by victorjose.gallego on 2/4/16.
 */

/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
    layoutSave: [],
    dashboard: [],
    isDialogOpened: false,
    suggestionList: [],
}

export default function DashboardReducer(state = InitialState, {type = '', payload = {}} = {type : '', payload : { }}){
    switch (type){
    	case TYPES.ADD_REMOVE_ELEMENT_LAYOUT:
    		return {
    			...state,
    			dashboard : payload.dashboard
    		}

        case TYPES.SAVE_LAYOUT:
            return {
                ...state,
                layoutSave: payload.layout,
            }

        case TYPES.TOGGLE_DIALOG:
            return {
                ...state,
                isDialogOpened: !state.isDialogOpened,
                kpi: undefined,
            }

        case TYPES.UPDATE_SUGGESTION_LIST:
            return {
                ...state,
                suggestionList: payload.suggestionList,
            }

        case TYPES.SET_KPI:
            return {
                ...state,
                kpi: payload.kpi
            }
    		
        default:
            return state
    }
}