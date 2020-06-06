import * as actions from "./collection-action"



// CREATE COLLECTIONS 

export const createCollection = ()=>{
    return{
        type: actions.CREATE_COLLECTION,
    }
}


export const createCollectionSuccess = (payload)=>{
    return{
        type: actions.CREATE_COLLECTION_SUCCESS,
        payload
    }
}


export const createCollectionFailure = (payload)=>{
    return{
        type: actions.CREATE_COLLECTION_FAILURE,
        payload
    }
}


// ADD TO COLLECTION


export const addToCollection = ()=>{
    return{
        type: actions.ADD_TO_COLLECTION,
    }
}

export const addToCollectionSuccess = (payload)=>{
    return{
        type: actions.ADD_TO_COLLECTION_SUCCESS,
        payload
    }
}

export const addToCollectionFailure = (payload)=>{
    return{
        type: actions.ADD_TO_COLLECTION_FAILURE,
        payload
    }
}





















// Todo
// export const deleteCollection = (payload)=>{
//     return{
//         type: actions.DELETE_COLLECTION,
//         payload
//     }
// }