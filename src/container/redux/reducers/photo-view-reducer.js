import * as actions from '../actions/photo-view-action/photo-view-action'

const INITIAL_STATE = {
    preview: '',
    loading: false,
    message: ''
}

const ViewReducer = ( state = INITIAL_STATE, action )=>{
    const { type, payload } = action

    switch(type){
        case actions.LOAD_PREVIEW:
            return{
                ...state,
                preview: payload
            }

            // FIND MATCHING PHOTO
        case actions.FIND_MATCH_BEGIN:
                return{
                    ...state,
                    loading: true,
                    message: ''
                }
        case actions.FIND_MATCH_SUCCESS:
            return{
                ...state,
                loading: false,
                message: '',
                preview: payload
            }
        case actions.FIND_MATCH_FAILURE:
            return{
                ...state,
                loading: false,
                message: payload,
                preview: null
            }

        default:
            return state
    
    }
}

export default ViewReducer