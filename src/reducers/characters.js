import { RECEIVE_CHARACTERS, CREATE_CHARACTERS, START_EDIT_CHARACTER, CANCEL_EDIT_CHARACTER, UPDATE_CHARACTER, REMOVE_CHARACTER } from '../actions/characters'

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
    case CREATE_CHARACTERS:
    return {
      ...state,
      list: [...state.list, action.character]
    }
    case START_EDIT_CHARACTER:
      return {
        ...state,
        editing: action.character
      }
    case CANCEL_EDIT_CHARACTER:
      return {
        ...state,
        editing: false
      }
    case UPDATE_CHARACTER:
      return {
        ...state,
        list: state.list.map(character => {
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
    default:
      return { ...state}
  }

}