import { RECEIVE_INITIATIVES, CREATE_INITIATIVES } from '../actions/initiatives'

const defaultState = {
    list: null,
    editing: false,
    active: false
}

export default function Encounters(state = defaultState, action) {
    switch (action.type) {
        case RECEIVE_INITIATIVES:
            const active = action.initiatives.filter(initiative => {
                return initiative.active
            })
            return {
                ...state,
                list: action.initiatives,
                active: active.length > 0 ? active.pop() : false
            }
        case CREATE_INITIATIVES:
            state.list.push(action.initiative)
            return {
                ...state,
                list: state.list,
            }
        default:
            return { ...state }
    }

}