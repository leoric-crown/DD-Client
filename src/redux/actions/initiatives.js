import * as API from '../../utils/api'

export const RECEIVE_INITIATIVES = 'RECEIVE_INITIATIVES'
export const CREATE_INITIATIVE = 'CREATE_INITIATIVE'
export const UPDATE_INITIATIVE = 'UPDATE_INITIATIVE'
export const DELETE_INITIATIVE = 'DELETE_INITIATIVE'
export const REMOVE_INITIATIVE = 'REMOVE_INITIATIVE'
export const SET_NEXT_TURN = 'SET_NEXT_TURN'
export const UPDATE_INITIATIVE_STAMP = 'UPDATE_INITIATIVE_STAMP'

export function postInitiative(token, payload) {
    return (dispatch) => {
        return API.postInitiative(token, payload)
            .then(response => {
                dispatch(createInitiative(response.createdInitiatives))
            })
    }
}

export function patchInitiative(token, payload, url) {
    return (dispatch) => {
        return API.patchByUrl(token, payload, url)
            .then(response => {
                if(response.status.code === 200) {
                    dispatch(updateInitiative(payload, response._id))
                }
            })
    }

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
export function updateInitiative(payload, id) {
    return {
        type: UPDATE_INITIATIVE,
        id,
        payload
    }
}

export function updateInitiativeStamp(payload, id) {
    return {
        type: UPDATE_INITIATIVE_STAMP,
        id,
        payload
    }
}

export function getNextTurn(token, encounterId, prevActive, deletePrevious = false) {
    return (dispatch) => {
        return API.setNextTurn(token, encounterId, deletePrevious)
            .then(response => {
                if (response.status.code === 200) {
                    dispatch(setNextTurn(prevActive, response.activeInitiative, response.deleted))
                }
            })
    }
}

export function setNextTurn(prevActive, newActive, deleted) {
    return {
        type: SET_NEXT_TURN,
        prevActive,
        newActive,
        deleted
    }
}

export function createInitiative(initiatives) {
    return {
        type: CREATE_INITIATIVE,
        initiatives
    }
}

export function receiveInitiatives(initiatives, user) {
    return {
        type: RECEIVE_INITIATIVES,
        initiatives,
        user
    }
}
