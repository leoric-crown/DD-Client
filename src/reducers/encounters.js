import { RECEIVE_ENCOUNTERS, CREATE_ENCOUNTERS, START_EDIT_ENCOUNTER, CANCEL_EDIT_ENCOUNTER, UPDATE_ENCOUNTER, REMOVE_ENCOUNTER } from '../actions/encounters'

const defaultState = {
  list: null,
  editing: false
}

export default function Encounters(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_ENCOUNTERS:
      return {
        ...state,
        list: action.encounters
      }
    case CREATE_ENCOUNTERS:
      return {
        list: state.list.push(action.encounter),
        ...state,
      }
    case START_EDIT_ENCOUNTER:
      return {
        ...state,
        editing: action.encounter
      }
    case CANCEL_EDIT_ENCOUNTER:
      return {
        ...state,
        editing: false
      }
    case UPDATE_ENCOUNTER:
      return {
        ...state,
        list: state.list.map(encounter => {
          if (encounter._id === action.id) {
            action.payload.forEach(update => {
              encounter[update.propName] = update.value
            })
            return encounter
          }
          return encounter
        }),
        editing: false
      }
    case REMOVE_ENCOUNTER:
      return {
        ...state,
        list: state.list.filter(encounter => {
          return encounter._id !== action.id
        })
      }
    default:
      return state
  }

}