import TYPES from '../actions/types/UIActionTypes'

const InitialState = {
    isMenuOpened: false,
    title: 'Editor KPI'
}

export default function UIReducer(state = InitialState, action = {type:'', payload: {}}){
    switch (action.type){
        case TYPES.TOGGLE_MENU:
            return {
                ...state,
                isMenuOpened : !state.isMenuOpened
            }
        case TYPES.SET_TITLE:
            return {
                ...state,
                title: action.payload.title
            };
        default:
            return state
    }
}