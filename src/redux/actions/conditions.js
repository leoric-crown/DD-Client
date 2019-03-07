import * as API from '../../utils/api'

export const RECEIVE_CONDITIONS = 'RECEIVE_CONDITIONS'

export function receiveConditions(conditions, user) {
    return {
        type: RECEIVE_CONDITIONS,
        conditions,
        user
    }
}