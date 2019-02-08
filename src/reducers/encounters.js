import { RECEIVE_ENCOUNTERS, CREATE_ENCOUNTERS } from '../actions/encounters'

const defaultState = null

export default function Encounters(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_ENCOUNTERS:
      return action.encounters
    case CREATE_ENCOUNTERS:
      return state ? state.concat(action.encounter) : [action.encounter]
    default:
      return state
  }

}