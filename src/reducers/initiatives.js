import { RECEIVE_INITIATIVES, CREATE_INITIATIVES, REMOVE_INITIATIVE, UPDATE_INITIATIVE_STAMP} from '../actions/initiatives'

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
        case UPDATE_INITIATIVE_STAMP:
            return {
                ...state,
                list: state.list.map(initiative => {
                    if(initiative._id === action.id) {
                        action.payload.forEach(update => {
                            initiative.characterStamp[update.propName] = update.value
                        })
                        return initiative
                    }
                    return initiative
                })
            }
        default:
            return { ...state }
    }

}