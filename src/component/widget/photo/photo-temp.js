import React, { useState } from 'react'
import styled from 'styled-components';




const StyledPhoto = styled.div`
    overflow: hidden;
    max-width: 250px;
    min-width: 200px;
    height: 350px;
    margin-bottom: 20px;
    border: 1px solid #eee;
    
    & .photo-head{
        position: absolute;
        color: #fff;
        background: transparent;
        width: 95%;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 600;
        z-index: 999;
    }
    & .photo-head p {
        width: 30%;
        height: 5px;
        background: #aaa;
    }
    & .photo-head .author{
        height: 30px;
        width: 30px;
        border-radius: 100%;
        background: #aaa;
    }
    & .photo-head::after{
        content: '';
        position: absolute;
        width: 100%;
        box-shadow:  0px -50px 30px rgba(0,0,0,.08);
        height: 35px;
        top: 120%;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
    }
    & .favorite{
        color: red;
    }
`

const DemoPhoto = ({height, isFav})=>{
    
    
    

    const styles = {
        image: {
            objectFit: "cover",
            width: '100%',
            background: '#eee',
            // VARY HEIGHT TO SIMULATE MANSORY LAYOUT
            height:  height ? `${height}px` : 'auto',
        }

    }
    const [ fav, setFav ] = useState(false)
    const queueFav = ()=>{
        fav ? setFav(false) : setFav(true)
    }   

    // Switch between liked and unliked icons
    const icon = fav || isFav ? "favorite" : "favorite_border"
    const favClass = fav || isFav ? "favorite" : ""
    



    return(
       
        <StyledPhoto className="white relative photo">
            <div className="no-wrap white padded-10 align-c grid apart photo-head">
                <div className='author'></div>
                <p></p>
                <i 
                    title={isFav ? 'Remove from Bucket' : 'Add to bucket'} 
                    onClick={queueFav} 
                    className={`link material-icons ${favClass}`} >{icon}
                </i>
            </div>
            <div style={styles.image} className='img'></div>
        </StyledPhoto>
    )
} 

export default DemoPhoto