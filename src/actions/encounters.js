import * as API from '../utils/api'
export const RECEIVE_ENCOUNTERS = 'RECEIVE_ENCOUNTERS'
export const CREATE_ENCOUNTERS = 'CREATE_ENCOUNTERS'
export const START_EDIT_ENCOUNTER = 'START_EDIT_ENCOUNTER'
export const CANCEL_EDIT_ENCOUNTER = 'CANCEL_EDIT_ENCOUNTER'
export const UPDATE_ENCOUNTER = 'UPDATE_ENCOUNTER'
export const DELETE_ENCOUNTER = 'DELETE_ENCOUNTER'
export const REMOVE_ENCOUNTER = 'REMOVE_ENCOUNTER'


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

export function removeEncounter(id) {
    return {
        type: REMOVE_ENCOUNTER,
        id
    }
}

export function startEditEncounter(encounter) {
    return {
        type: START_EDIT_ENCOUNTER,
        encounter
    }
}

export function cancelEditEncounter() {
    return {
      type: CANCEL_EDIT_ENCOUNTER
    }
  }
  
  export function updateEncounter(payload, id) {
    return {
      type: UPDATE_ENCOUNTER,
      id,
      payload
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
