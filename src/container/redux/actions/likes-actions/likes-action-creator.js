import * as actions from './likes-actions'


export const like = (payload)=>{
    return{
        type: actions.LIKE,
        payload
    }
}

export const likeFailure = (payload)=>{
    return{
        type: actions.LIKE_FAILURE,
        payload
    }
}


export const emptyLike = ()=>{
    return{
        type: actions.EMPTY_LIKE,
    }
}

