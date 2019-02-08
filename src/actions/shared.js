import { getInitialData } from '../utils/api'
import { receiveCharacters } from './characters'

export function handleInitialData(userId, jwt) {
  return (dispatch) => {
    return getInitialData(userId, jwt)
      .then((characters) => {
        dispatch(receiveCharacters(characters))
      })
  }
}
