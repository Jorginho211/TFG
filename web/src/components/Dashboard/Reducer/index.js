/**
 * Created by victorjose.gallego on 2/4/16.
 */

/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
    layoutSave: [],
    /*dashboard: [
        {
            idkpi: "1",
            chartType: "line",
            layout: { h: 9, w: 5, x: 3, y: 8, i: "1||line" }
        },
        {
            idkpi: "1",
            chartType: "bar",
            layout: { h: 8, w: 6, x: 4, y: 0, i: "1||bar" }
        },
        {
            idkpi: "2",
            chartType: "pie",
            layout: { h: 8, w: 4, x: 0, y: 0, i: "2||pie" }
        }
    ]*/
    dashboard: [],
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
    		
        default:
            return state
    }
}