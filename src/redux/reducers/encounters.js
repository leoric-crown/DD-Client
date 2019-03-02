import { RECEIVE_ENCOUNTERS, CREATE_ENCOUNTER, UPDATE_ENCOUNTER, REMOVE_ENCOUNTER, SET_ACTIVE_ENCOUNTER, CLEAR_ACTIVE_ENCOUNTER } from '../actions/encounters'

const defaultState = {
  list: null,
  editing: false,
  active: false,
}

export default function Encounters(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_ENCOUNTERS:
      const active = action.encounters.filter(encounter => {
        return encounter.status === 'Active'
      })
      return {
        ...state,
        list: action.encounters,
        active: active.length > 0 ? active.pop() : false
      }
    case CREATE_ENCOUNTER:
      return {
        ...state,
        list: [...state.list, action.encounter]
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
    case SET_ACTIVE_ENCOUNTER:
      return {
        ...state,
        list: state.list.map(encounter => {
          switch(encounter._id) {
            case action.active._id:
              encounter.status = 'Active'
              return encounter
            case action.prevActiveId:
              encounter.status = 'Concluded'
              return encounter
            default:
              return encounter
          }
        }),
        active: action.active
      }
    case CLEAR_ACTIVE_ENCOUNTER:
      return {
        ...state,
        list: state.list.map(encounter => {
          switch(encounter.status) {
            case 'Active':
              encounter.status = 'Concluded'
              return encounter
            default:
              return encounter
          }
        }),
        active: false
      }
    default:
      return { ...state }
  }

}