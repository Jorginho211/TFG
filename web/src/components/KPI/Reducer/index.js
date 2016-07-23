/**
 * Created by victorjose.gallego on 2/4/16.
 */

import TYPES from '../Actions/types/'

const InitialState = {
    isDialogOpened: false,
    isLoading: false,
    isNew: true,
    kpis: [],
}

export default function KPIReducer(state = InitialState, {type = '', payload = {}} = {type : '', payload : { }}){
    switch (type){
        case TYPES.TOGGLE_DIALOG:
            return {
                ...state,
                isDialogOpened : !state.isDialogOpened,
            }

        case TYPES.TOGGLE_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            }

        case TYPES.SET_KPIS:
            return {
                ...state,
                kpis: payload.kpis,
            }

        case TYPES.NEW_KPI:
            return {
                ...state,
                isNew: payload.isNew,
            }    
        default:
            return state
    }
}