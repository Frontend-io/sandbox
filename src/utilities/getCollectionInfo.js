const getCollectionInfo = (title, collections)=>{
        
    let collection = null

    for( let c in collections ){
        let index = collections[c]
        if( index.title.toLowerCase() === title.toLowerCase() ){
            collection = index
        }
    }
    return collection ? collection : false
}


export default getCollectionInfo