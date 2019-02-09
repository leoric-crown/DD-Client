import { getInitialData } from '../utils/api'
import { receiveCharacters } from './characters'
import { receiveEncounters } from './encounters';

export function handleInitialData(userId, jwt) {
  return (dispatch) => {
    return getInitialData(userId, jwt)
      .then(data => {
        dispatch(receiveCharacters(data.characters))
        dispatch(receiveEncounters(data.encounters))
      })
  }
}
