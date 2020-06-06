const parseTitle = (rawTitle)=>{
    if ( rawTitle){
        const test = rawTitle.split("/")[4].split('-').join(' ')
        const piece = test.split(' ')

        for(let i in piece){
            let word = piece[i]  
            if( word % 2 === 0 ||  word % 2 === 1 ){
            let index = piece.indexOf(word)
            delete piece[index]
            }
        }
        return piece.join(' ')
    }
}


export default parseTitle