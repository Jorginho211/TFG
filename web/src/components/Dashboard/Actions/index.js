/**
 * Created by victorjose.gallego on 2/4/16.
 */
import DASHBOARD_ACTION_TYPES from './types/'

export function addRemoveElement(layout){
    return {type: DASHBOARD_ACTION_TYPES.ADD_REMOVE_ELEMENT_LAYOUT, payload: { layout }}
}

export function saveLayout(layout){
    return {type: DASHBOARD_ACTION_TYPES.SAVE_LAYOUT, payload: { layout }}
}