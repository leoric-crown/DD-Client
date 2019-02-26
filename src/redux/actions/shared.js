import * as API from '../../utils/api'
import { receiveCharacters } from './characters'
import { receiveEncounters } from './encounters';
import { receiveInitiatives } from './initiatives'

export function handleInitialData(userId, jwt) {
  return (dispatch) => {
    return API.getInitialData(userId, jwt)
      .then(data => {
        dispatch(receiveCharacters(data.characters))
        dispatch(receiveEncounters(data.encounters))
        dispatch(receiveInitiatives(data.initiatives))
      })
  }
}
