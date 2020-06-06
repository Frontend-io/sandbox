import * as actions from "../actions/photo-action/photo-action"


const initialState = {
    photos: null,
    loading: false,
    message: "",
    // PHOTO MATCH IN VIEW
    preview : null
}



const photoReducer = ( state = initialState, action )=>{
    const { type, payload } = action

    switch(type){
        case actions.FETCH_PHOTO_BEGIN:
            return{
                ...state,
                loading: true,
                message: "",
                category: payload

            }
        case actions.FETCH_PHOTO_SUCCESS:
            return{
                ...state,
                loading: false,
                message: '',
                photos: payload.photos,
            }
        case actions.FETCH_PHOTO_FAILURE:
            return{
                ...state,
                loading: false,
                message: payload,
                photos: null
            }

        default: 
            return state
    }

}


export default photoReducer