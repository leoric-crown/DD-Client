import * as API from '../utils/api'
export const RECEIVE_ENCOUNTERS = 'RECEIVE_ENCOUNTERS'
export const CREATE_ENCOUNTERS = 'CREATE_ENCOUNTERS'


export function createEncounter(token, payload) {
    return (dispatch) => {
        return API.createEncounter(token, payload)
            .then((response) => {
                dispatch(createEncounters(response.createdEncounter))
            })
    }
}

export function receiveEncounters(encounters) {     
    return {
        type: RECEIVE_ENCOUNTERS,
        encounters
    }
}

export function createEncounters(encounter) {
    return {
        type: CREATE_ENCOUNTERS,
        encounter
    }
}
