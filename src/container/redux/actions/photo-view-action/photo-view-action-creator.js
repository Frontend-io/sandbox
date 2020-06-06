import * as actions from './photo-view-action'
import Axios from 'axios';

// LOAD PREVIEW IMAGE 

export const loadPreview = (payload)=>{
    return{
        type: actions.LOAD_PREVIEW,
        payload
    }
}



// SEARCHING FOR PHOTO MATCH
const findMatchBegin = ()=>{
    return{
        type: actions.FIND_MATCH_BEGIN
    }
}


const findMatchSuccess = (payload)=>{
    return{
        type: actions.FIND_MATCH_SUCCESS,
        payload
    }
}


const findMatchFailure = (payload)=>{
    return{
        type: actions.FIND_MATCH_FAILURE,
        payload
    }
}


export const findMatch = (id)=>{

    return(dispatch)=>{
         dispatch(findMatchBegin())

         const KEY = "563492ad6f9170000100000160f67cb297a84d5b8cd4cab93fbb713f"
         const URL = `https://api.pexels.com/v1/photos/${id}`
         Axios
         .get(URL, {
             headers: {
                 'Authorization': `${KEY}`
             }
         })
         .then(res => {
            const data = res.data
            dispatch(findMatchSuccess(data))
         })
         .catch(err =>{
             if(err.response){
                const { status } = err.response.data
                dispatch(findMatchFailure(status))
             }
         })
    }
 }


