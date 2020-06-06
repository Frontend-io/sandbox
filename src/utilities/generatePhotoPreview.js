const generatePhotoPreview = (target)=>{
   

    if( target.length > 0 ){
        const { name, size, type } = target[0] 
        const preview = URL.createObjectURL(target[0] )

        return{
            title: name,
            size: size > 2000 ? `${(Math.round(size/1000000))}MB` : `${(size/1000000)}MB`,
            type,
            preview,
            sizeInKB: size/1000
        }
    }
    
}

export default generatePhotoPreview