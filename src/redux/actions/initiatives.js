import * as API from '../../utils/api'

export const RECEIVE_INITIATIVES = 'RECEIVE_INITIATIVES'
export const CREATE_INITIATIVES = 'CREATE_INITIATIVES'
export const UPDATE_INITIATIVE = 'UPDATE_INITIATIVE'
export const DELETE_INITIATIVE = 'DELETE_INITIATIVE'
export const REMOVE_INITIATIVE = 'REMOVE_INITIATIVE'
export const SET_NEXT_TURN = 'SET_NEXT_TURN'
export const SET_ENCOUNTER = 'SET_ENCOUNTER'
export const UPDATE_INITIATIVE_STAMP = 'UPDATE_INITIATIVE_STAMP'

export function createInitiative(token, payload) {
    return (dispatch) => {
        return API.createInitiative(token, payload)
            .then(response => {
                dispatch(createInitiatives(response.createdInitiatives))
            })
    }
}

export function patchInitiative(token, payload, url) {

}

export function patchInitiativeCharacter(token, payload, url) {
    return (dispatch) => {
        return API.patchByUrl(token, payload, url)
            .then((response) => {
                if (response.status.code === 200) {
                    dispatch(updateInitiativeStamp(payload, response._id))
                }
            })
    }
}

export function deleteInitiative(token, id) {
    return (dispatch) => {
        return API.deleteInitiative(token, id)
            .then(response => {
                if (response.status.code === 200) {
                    dispatch(removeInitiative(id))
                }
            })
    }
}

export function removeInitiative(id) {
    return {
        type: REMOVE_INITIATIVE,
        id
    }
}

export function updateInitiativeStamp(payload, id) {
    return {
        type: UPDATE_INITIATIVE_STAMP,
        id,
        payload
    }
}

export function deleteActiveInitiative(token, encounterId, prevActiveId) {
    return (dispatch) => {
        return API.deleteActiveInitiative(token, encounterId, prevActiveId)
            .then(({ nextTurnResponse, deleteResponse }) => {
                if (nextTurnResponse.status.code === 200 &&
                    deleteResponse.status.code === 200) {
                    dispatch(setNextTurn(null, nextTurnResponse.activeInitiative))
                    dispatch(removeInitiative(prevActiveId))
                }

            })
    }
}

export function getNextTurn(token, encounterId, prevActive) {
    return (dispatch) => {
        return API.setNextTurn(token, encounterId).then(response => {
            if (response.status.code === 200) {
                dispatch(setNextTurn(prevActive, response.activeInitiative))
            }
        })
    }
}

export function setNextTurn(prevActive, newActive) {
    return {
        type: SET_NEXT_TURN,
        prevActive,
        newActive

    }
}

export function createInitiatives(initiatives) {
    return {
        type: CREATE_INITIATIVES,
        initiatives
    }
}

export function receiveInitiatives(initiatives) {
    return {
        type: RECEIVE_INITIATIVES,
        initiatives
    }
}
