export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS'

export function receiveCharacters (characters) {
  return {
    type: RECEIVE_CHARACTERS,
    characters
  }
}
