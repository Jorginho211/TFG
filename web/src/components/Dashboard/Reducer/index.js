/**
 * Created by victorjose.gallego on 2/4/16.
 */

/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
	layout:[
		{i: 'a', x: 0, y: 0, w: 1, h: 2},
      	{i: 'b', x: 1, y: 0, w: 3, h: 2},
      	{i: 'c', x: 4, y: 0, w: 1, h: 2},
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