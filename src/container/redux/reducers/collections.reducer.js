import * as actions from "../actions/collections-action/collection-action"



// Function to update collection images 
const addToPhotoToCollection = (item, state )=>{
    const { collections } = state
    const { imageId, id } = item

    
    for(let i in collections ){
        let index = collections[i]
        if(id.toString() === index.id.toString()){
            if(index.photos.includes(imageId)){
               index.photos = index.photos.filter( p => p !== imageId)
            }else{
                index.photos = [imageId, ...index.photos]
            }
            break;
        }
    }

    return state
}










const initialState = {
    collections: [
        { 
            title: 'Memories of a bird that cried sadly', 
            id: 348723, 
            tags: ['Landscape', 'Mountains'], 
            description: 'A wonderful collection of stock pictures from rural Keyan depicting regions of high clifs and foggy mountains' , 
            photos: [{url:'https://images.pexels.com/photos/2530912/pexels-photo-2530912.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'}, {url:'https://images.pexels.com/photos/3783044/pexels-photo-3783044.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'}], 
            isPrivate: false
        },
        { title: 'Flowers', id: 937423,  tags: ['Flowers', 'Colourful'],  description: 'Nigerians collection of stock pictures from rural Keyan depicting regions of high clifs and foggy mountains', photos: [{url:'https://images.pexels.com/photos/4045428/pexels-photo-4045428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}], isPrivate: true},
        { title: 'Drunken sad master', id: 239083, tags: ['Landscape', 'Mountains'], description: 'A wonderful collection of stock pictures from rural Keyan depicting regions of high clifs and foggy mountains' , photos: [{url:'https://images.pexels.com/photos/2530912/pexels-photo-2530912.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'}, {url:'https://images.pexels.com/photos/3783044/pexels-photo-3783044.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'}], isPrivate: false},
        
    ],
    loading: false,
    error: '',
}






const collectionsReducer = ( state = initialState, action )=>{
    const { type, payload } = action

    switch(type){
        case actions.ADD_TO_COLLECTION:
            return{
                ...state,
                adding: true,
                error: ''

            }
        case actions.ADD_TO_COLLECTION_SUCCESS:
            return addToPhotoToCollection(payload, state)

        case actions.ADD_TO_COLLECTION_FAILURE:
            return{
                ...state,
                error: payload,
                adding: false
            }
        case actions.CREATE_COLLECTION:
            return{
                 ...state,
                 error: '',
                creatingCollection: true,         
            }

        case actions.CREATE_COLLECTION_SUCCESS:
            return{
                ...state,
                error: '',
                creatingCollection: false,   
                collections: [
                    payload,
                    ...state.collections
                ]      
            }
        case actions.CREATE_COLLECTION_FAILURE:
            return{
                ...state,
                error: payload,
                creatingCollection: false,       
            }

        default: 
            return state
    }

}


export default collectionsReducer