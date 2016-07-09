/**
 * Created by victorjose.gallego on 2/4/16.
 */
import DASHBOARD_ACTION_TYPES from './types/'

export function changeLayout(layout){
    return {type: DASHBOARD_ACTION_TYPES.CHANGE_LAYOUT, payload: { layout }}
}