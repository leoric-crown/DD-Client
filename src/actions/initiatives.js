import * as API from '../utils/api'

export const RECEIVE_INITIATIVES = 'RECEIVE_INITIATIVES'
export const CREATE_INITIATIVES = 'CREATE_INITIATIVES'
export const UPDATE_INITIATIVE = 'UPDATE_INITIATIVE'
export const DELETE_INITIATIVE = 'DELETE_INITIATIVE'
export const REMOVE_INITIATIVE = 'REMOVE_INITIATIVE'
export const SET_NEXT_TURN = 'SET_NEXT_TURN'
export const SET_ENCOUNTER = 'SET_ENCOUNTER'

export function createInitiative(token, payload) {
    return (dispatch) => {
        return API.createInitiative(token, payload)
            .then(response => {
                dispatch(createInitiatives(response.createdInitiatives))
            })
    }
}

export function patchInitiative(token, payload, id) {

}

export function patchInitiativeCharacter(token, payload, id) {

}

export function deleteInitiative(token, id) {
    return (dispatch) => {
        return API.deleteInitiative(token, id)
            .then(response => {
                if(response.status.code === 200) {
                    dispatch(removeInitiative(id))
                }
            })
    }
}

export function getNextTurn(token) {

}

export function removeInitiative(id) {
    return {
        type: REMOVE_INITIATIVE,
        id
    }
}

export function updateInitiative(payload, id) {
    return {

    }
}

export function setNextTurn(initiative, prevTurn) {

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
