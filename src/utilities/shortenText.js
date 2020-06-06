const shortenText = (text, length, suffix)=>{
    return text.length >= 18 ? text.split(' ', length).join(' ').concat(suffix) : text
}

export default shortenText