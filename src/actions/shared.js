import * as API from '../utils/api'
import { receiveCharacters } from './characters'
import { receiveEncounters } from './encounters';
import { receiveInitiatives } from './initiatives'

export function handleInitialData(userId, jwt) {
  return (dispatch) => {
    return API.getInitialData(userId, jwt)
      .then(data => {
        dispatch(receiveCharacters(data.characters))
        dispatch(receiveEncounters(data.encounters))
        dispatch(receiveInitiatives(data.initiatives, data.initiativesCount))
      })
  }
}

export function patchByUrl(token, payload, url) {
  return (dispatch) => {
    return API.patchByUrl(token, payload, url)
    .then(response => {
        if(response.status.code === 200) {
          //dispatch (need to figure out a way to know to which reducer)
        }
    })
  }
}
