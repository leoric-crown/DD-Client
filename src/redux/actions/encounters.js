import * as API from '../../utils/api'

export const RECEIVE_ENCOUNTERS = 'RECEIVE_ENCOUNTERS'
export const CREATE_ENCOUNTER = 'CREATE_ENCOUNTER'
export const UPDATE_ENCOUNTER = 'UPDATE_ENCOUNTER'
export const DELETE_ENCOUNTER = 'DELETE_ENCOUNTER'
export const REMOVE_ENCOUNTER = 'REMOVE_ENCOUNTER'
export const SET_ACTIVE_ENCOUNTER = 'SET_ACTIVE_ENCOUNTER'
export const CLEAR_ACTIVE_ENCOUNTER = 'CLEAR_ACTIVE_ENCOUNTER'
export const encounterWsActions = [
    CREATE_ENCOUNTER,
    UPDATE_ENCOUNTER,
    REMOVE_ENCOUNTER,
    SET_ACTIVE_ENCOUNTER,
    CLEAR_ACTIVE_ENCOUNTER
]


export function postEncounter(token, payload) {
    return (dispatch) => {
        return API.postEncounter(token, payload)
            .then((response) => {
                dispatch(createEncounter(response.createdEncounter))
            })
    }
}

export function patchEncounter(token, payload, url) {
    return (dispatch) => {
        return API.patchByUrl(token, payload, url)
            .then(response => {
                if (response.status.code === 200) {
                    dispatch(updateEncounter(payload, response._id))
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

export function changeActiveEncounter(token, id, prevActiveId) {
    return (dispatch) => {
        return API.changeActiveEncounter(token, { id, prevActiveId })
            .then(response => {
                if (response.status.code === 200) {
                    dispatch(setActiveEncounter(response.activeEncounter, prevActiveId))
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
export function setActiveEncounter(encounter, prevActiveId) {
    return {
        type: SET_ACTIVE_ENCOUNTER,
        active: encounter,
        prevActiveId
    }
}

export function receiveEncounters(encounters, user) {
    return {
        type: RECEIVE_ENCOUNTERS,
        encounters,
        user
    }
}

export function createEncounter(encounter) {
    return {
        type: CREATE_ENCOUNTER,
        encounter
    }
}
