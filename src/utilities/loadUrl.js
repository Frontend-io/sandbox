const loadUrl = (url)=>{
    return window.history.pushState({}, '', url)
}

export default loadUrl