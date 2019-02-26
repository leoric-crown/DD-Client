import * as API from '../../utils/api'
import { receiveCharacters } from './characters'
import { receiveEncounters } from './encounters';
import { receiveInitiatives } from './initiatives'

export function handleInitialData(user, jwt) {
  return (dispatch) => {
    return API.getInitialData(user, jwt)
      .then(data => {
        const authedUserData = {
          email: user.email,
          isDM: user.isDM,
          userId: user.userId
        }
        dispatch(receiveCharacters(data.characters, authedUserData))
        dispatch(receiveEncounters(data.encounters, authedUserData))
        dispatch(receiveInitiatives(data.initiatives, authedUserData))
      })
  }
}
