import * as actions from "../actions/search-action/search-action"

const initialState = {
    isSearching: false,
    message: '',
    result: null,
    pageNum: '',
    searchTerm: ''
}

const SearchReducer = ( state = initialState, action )=>{
    const { type, payload } = action

    switch(type){
        case actions.IS_SEARCHING:
            return{
                ...state,
                isSearching: true,
                message: '',
                searchTerm: payload
            }
        case actions.DONE_SEARCHING:
            return{
                ...state,
                isSearching: false,
                message: ''
            }
        case actions.SEARCH_SUCCESS:
                return{
                    ...state,
                    isSearching: true,
                    message: '',
                    result: payload.photos,
                }
        case actions.SEARCH_FAILURE:
                return{
                    ...state,
                    isSearching: true,
                    message: payload,
                    result: null,
                }
        case actions.NEXT_PAGE:
            return{
                ...state,
                pageNum: state.pageNum + 1
            }
        case actions.PREV_PAGE:
            return{
                ...state,
                pageNum: state.pageNum - 1
            }
        default: 
            return state
    }

}


export default SearchReducer