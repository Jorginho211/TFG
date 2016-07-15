/**
 * Created by victorjose.gallego on 2/4/16.
 */

/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
	layout:[
        {h: 3, w: 2, x: 2, y: 0, i: "1"},
        {h: 5, w: 3, x: 4, y: 3, i: "2"},
	],

    layoutSave: []
}

export default function DashboardReducer(state = InitialState, {type = '', payload = {}} = {type : '', payload : { }}){
    switch (type){
    	case TYPES.ADD_REMOVE_ELEMENT_LAYOUT:
    		return {
    			...state,
    			layout: payload.layout,
    		}

        case TYPES.SAVE_LAYOUT:
            return {
                ...state,
                layoutSave: payload.layout,
            }

        case TYPES.CHANGE_ADD_REMOVE_ELEMENT:
            return {
                ...state,
                layoutSave: payload.layout,
            }
    		
        default:
            return state
    }
}