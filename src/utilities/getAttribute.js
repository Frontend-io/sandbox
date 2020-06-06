
const getAttribute = (target,data)=>{
    const logic = target.getAttribute(`data-${data}`)
    return(
        !isNaN(parseInt(logic)) ? parseInt(logic) : logic
    )
}

export default getAttribute