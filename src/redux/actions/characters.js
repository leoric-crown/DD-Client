import * as API from '../../utils/api'
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS'
export const CREATE_CHARACTER = 'CREATE_CHARACTER'
export const UPDATE_CHARACTER = 'UPDATE_CHARACTER'
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER'


export function postCharacter(token, payload) {
  console.log('postCharacter action')
  return (dispatch) => {
    return API.postCharacter(token, payload)
      .then((response) => {
        dispatch(createCharacter(response.createdCharacter))
      })
  }
}

export function patchCharacter(token, payload, url) {
  return (dispatch) => {
    return API.patchByUrl(token, payload, url)
      .then((response) => {
        if(response.status.code === 200) {
          dispatch(updateCharacter(payload, response._id))
        }
      })
  }

}

export function deleteCharacter(token, id) {
  return (dispatch) => {
    return API.deleteCharacter(token, id)
      .then(response => {
        if (response.status.code === 200) {
          dispatch(removeCharacter(id))
        }
      })
  }
}

export function removeCharacter(id) {
  return {
    type: REMOVE_CHARACTER,
    id
  }
}

export function updateCharacter(payload, id) {
  return {
    type: UPDATE_CHARACTER,
    id,
    payload
  }
}

export function receiveCharacters(characters, user) {
  return {
    type: RECEIVE_CHARACTERS,
    characters,
    user
  }
}

export function createCharacter(character) {
  return {
    type: CREATE_CHARACTER,
    character
  }
}
