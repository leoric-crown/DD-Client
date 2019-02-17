import * as API from '../utils/api'

export const RECEIVE_INITIATIVES = 'RECEIVE_INITIATIVES'
export const CREATE_INITIATIVES = 'CREATE_INITIATIVES'
export const START_EDIT_INITIATIVE = 'START_EDIT_INITIATIVE'
export const CANCEL_EDIT_INITIATIVE = 'CANCEL_EDIT_INITIATIVE'
export const UPDATE_INITIATIVE = 'UPDATE_INITIATIVE'
export const DELETE_INITIATIVE = 'DELETE_INITIATIVE'
export const REMOVE_INITIATIVE = 'REMOVE_INITIATIVE'
export const SET_NEXT_TURN = 'SET_NEXT_TURN'

export function createInitiative(token, payload) {
    return (dispatch) => {
        return API.createInitiative(token, payload)
        .then(response => {
            dispatch(createInitiatives(response.createdInitiative))
        })
    }
}

export function patchInitiative(token, payload, id) {

}

export function patchInitiativeCharacter(token, payload, id) {

}

export function deleteInitiative(token, id) {

}

export function getNextTurn(token) {

}

export function removeInitiative(id) {

}

export function startEditInitiative(initiative) {

}

export function cancelEditInitiative() {

}

export function updateInitiative(payload, id) {

}

export function setNextTurn(initiative, prevTurn) {

}

export function createInitiatives(initiative) {
    return {
        type: CREATE_INITIATIVES,
        initiative
    }
}

export function receiveInitiatives(initiatives) {
    return {
        type: RECEIVE_INITIATIVES,
        initiatives
    }
}
