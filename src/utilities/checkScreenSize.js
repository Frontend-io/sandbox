const screenSize = ()=>{

    const { outerWidth, innerWidth, outerHeight, innerHeight, pageYOffset } = window
    return{
        outerHeight,
        innerHeight,
        outerWidth,
        innerWidth,
        pageYOffset,
    }
}

export default screenSize