import {
  RECEIVE_CHARACTERS,
  CREATE_CHARACTER,
  UPDATE_CHARACTER,
  REMOVE_CHARACTER
} from '../actions/characters'

const defaultState = {
  list: null,
  editing: false
}

export default function Characters(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_CHARACTERS:
      return {
        ...state,
        list: action.characters
      }
    case CREATE_CHARACTER:
      return {
        ...state,
        list: [...state.list, action.character]
      }
    case UPDATE_CHARACTER:
      const list = [...state.list]
      return {
        ...state,
        list: list.map(character => {
          if (character._id === action.id) {
            action.payload.forEach(update => {
              character[update.propName] = update.value
            })
            return character
          }
          return character
        }),
        editing: false
      }
    case REMOVE_CHARACTER:
      return {
        ...state,
        list: state.list.filter(character => {
          return character._id !== action.id
        })
      }
    case 'test_websocket':
      return {
        ...state
      }
    default:
      return { ...state }
  }

}