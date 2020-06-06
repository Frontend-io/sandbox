import * as actions from './search-action'
import axios from 'axios'



export const searchingBegin = (payload)=>{
    return{
        type: actions.IS_SEARCHING,
        payload
    }
}


export const searchingEnd = ()=>{
    return{
        type: actions.DONE_SEARCHING
    }
}


export const searchSuccess = (payload)=>{
    return{
        type: actions.SEARCH_SUCCESS,
        payload
    }
}

export const searchFailure = (payload)=>{
    return{
        type: actions.SEARCH_FAILURE,
        payload
    }
}

export const searching = (query, perPage)=>{
    return(dispatch)=>{
         dispatch(searchingBegin(query))

         // AXIOS
        const KEY = "563492ad6f9170000100000160f67cb297a84d5b8cd4cab93fbb713f"
        const URL = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=1`
        axios
        .get(URL, {
            headers: {
                'Authorization': `${KEY}`
            }
        })
         .then(res => {
             const data = res.data
             dispatch(searchSuccess(data))
         })
         .catch(err =>{
             const error = err.message
             dispatch(searchFailure(error))
         })
    }
 }
 
