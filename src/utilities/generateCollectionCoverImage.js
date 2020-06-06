const generateCollectionCoverImage = (photos)=>{

    // Collections cover photos manipulations
    const length = photos ? photos.length : null
    const coverPhotos = {
        tall: length ? photos[ 0 ].url : null,
        extraOne: length >= 2 ? photos[ 1 ].url : null,
        extraTwo: length >= 3 ? photos[ 2 ].url : null
    }
    const dimensions = {
        extrasHeight: {
            height: length > 2 ? '50%' : '100%'
        }
    }

    return{
        length,
        ...coverPhotos,
        ...dimensions
    }
}

export default generateCollectionCoverImage