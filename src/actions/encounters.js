import * as API from '../utils/api'
export const RECEIVE_ENCOUNTERS = 'RECEIVE_ENCOUNTERS'
export const CREATE_ENCOUNTERS = 'CREATE_ENCOUNTERS'
export const UPDATE_ENCOUNTER = 'UPDATE_ENCOUNTER'
export const DELETE_ENCOUNTER = 'DELETE_ENCOUNTER'
export const REMOVE_ENCOUNTER = 'REMOVE_ENCOUNTER'
export const SET_ACTIVE_ENCOUNTER = 'SET_ACTIVE_ENCOUNTER'
export const CLEAR_ACTIVE_ENCOUNTER = 'CLEAR_ACTIVE_ENCOUNTER'


export function createEncounter(token, payload) {
    return (dispatch) => {
        return API.createEncounter(token, payload)
            .then((response) => {
                dispatch(createEncounters(response.createdEncounter))
            })
    }
}

export function patchEncounter(token, payload, id) {
    return (dispatch) => {
        return API.editEncounter(token, payload, id)
            .then(response => {
                if (response.status.code === 200) {
                    dispatch(updateEncounter(payload, id))
                }
            })
    }
}

export function deleteEncounter(token, id) {
    return (dispatch) => {
        return API.deleteEncounter(token, id)
            .then(response => {
                if (response.status.code === 200) {
                    dispatch(removeEncounter(id))
                }
            })
    }
}

export function changeActiveEncounter(token, id, prevActive) {
    return (dispatch) => {
        return API.changeActiveEncounter(token, id)
            .then(response => {
                if(response.status.code === 200) {
                    dispatch(setActiveEncounter(response.activeEncounter, prevActive))
                }
            })
    }
}

export function clearActiveEncounter() {
    return {
        type: CLEAR_ACTIVE_ENCOUNTER
    }
}

export function removeEncounter(id) {
    return {
        type: REMOVE_ENCOUNTER,
        id
    }
}

export function updateEncounter(payload, id) {
    return {
        type: UPDATE_ENCOUNTER,
        id,
        payload
    }
}
export function setActiveEncounter(encounter, prevActive) {
    return {
        type: SET_ACTIVE_ENCOUNTER,
        active: encounter,
        prevActive
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
