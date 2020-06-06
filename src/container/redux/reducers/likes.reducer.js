import * as actions from '../actions/likes-actions/likes-actions'



const initialState = {
    likedPhotos: [],
    adding: false,
    error: '',
}



const likesReducer = ( state = initialState, action )=>{
    const { type, payload } = action

    switch(type){
        case actions.LIKE:
            return {
                ...state,
                likedPhotos: 
                    state.likedPhotos.includes(payload) ? 
                    state.likedPhotos.filter( l => l !== payload ):
                    [payload, ...state.likedPhotos] 
            }

        case actions.LIKE_FAILURE:
            return{
                ...state,
                likedPhotos: [
                    ...state.likedPhotos
                ],
                error: payload 
            }
        case actions.EMPTY_LIKE:
            return{
                ...state,
                likedPhotos: []
            }
        default: 
            return state
    }

}


export default likesReducer