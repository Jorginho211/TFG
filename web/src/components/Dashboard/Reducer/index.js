/**
 * Created by victorjose.gallego on 2/4/16.
 */

/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
	layout:[
		{x: 2, y: 0, w: 2, h: 3},
      	{x: 4, y: 3, w: 3, h: 5},
      	{x: 1, y: 4, w: 2, h: 2},
	],
}

export default function DashboardReducer(state = InitialState, {type = '', payload = {}} = {type : '', payload : { }}){
    switch (type){
    	case TYPES.CHANGE_LAYOUT:
    		return {
    			...state,
    			layout: payload.layout,
    		}
    		
        default:
            return state
    }
}