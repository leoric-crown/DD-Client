import { RECEIVE_CHARACTERS, CREATE_CHARACTERS } from '../actions/characters'

const defaultState = []

export default function Characters (state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_CHARACTERS:
      return action.characters
      case CREATE_CHARACTERS:{
        return state.concat(action.character)
      }

    default :
      return state
  }

}
