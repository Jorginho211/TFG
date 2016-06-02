/**
 * Created by victorjose.gallego on 2/4/16.
 */

import CODEWIZARD_ACTION_TYPES from './types/'

export function templateType(templateType){
	return {type: CODEWIZARD_ACTION_TYPES.TEMPLATE_TYPE, payload: {templateType}}
}