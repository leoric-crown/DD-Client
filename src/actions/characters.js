import * as API from '../utils/api'
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS'
export const CREATE_CHARACTERS = 'CREATE_CHARACTERS'


export function createCharacter (token, payload) {
  return (dispatch) => {
    return API.createCharacter (token, payload)
      .then((response) => {
        dispatch(createCharacters(response.createdCharacter))
      })
  }
}

export function receiveCharacters (characters) {
  return {
    type: RECEIVE_CHARACTERS,
    characters
  }
}

export function createCharacters (character) {
  return {
    type: CREATE_CHARACTERS,
    character
  }
}
