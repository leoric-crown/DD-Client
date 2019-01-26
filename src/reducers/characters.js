import { RECEIVE_CHARACTERS } from '../actions/characters'

const defaultState = []

export default function Characters (state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_CHARACTERS:
      return action.characters
    default :
      return state
  }

}
