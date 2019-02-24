import { RECEIVE_INITIATIVES, CREATE_INITIATIVES, REMOVE_INITIATIVE} from '../actions/initiatives'

const defaultState = {
    list: null,
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
                count: action.count,
                active: active.length > 0 ? active.pop() : false
            }
        case CREATE_INITIATIVES:
            return {
                ...state,
                list: [...state.list, ...action.initiatives]
            }
        case REMOVE_INITIATIVE:
            return {
                ...state,
                list: state.list.filter(initiative => {
                    return initiative._id !== action.id
                })
            }
        default:
            return { ...state }
    }

}