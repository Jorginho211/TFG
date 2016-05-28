import UI_ACTION_TYPES from './types/UIActionTypes'

export function toggleMenu(){
    return {type: UI_ACTION_TYPES.TOGGLE_MENU}
}

export function setTitle(title){
    return {type: UI_ACTION_TYPES.SET_TITLE, payload: { title }}
}