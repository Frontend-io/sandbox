import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { randNum } from '../../utilities/randID';
import SearchForm from '../widget/search-form/search-form';



const StyledLanding = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 150px 20px 50px 20px;
    color: #ffffff;
    min-height: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    & .intro h2 {
        font-size: 30px;
        text-shadow: 2px 2px 1px rgba(0,0,0,.1);
    }
    & intro span {
        font-size: 18px;
        text-shadow: 2px 2px 1px rgba(0,0,0,.1);
    }
    .search-form{
        max-width: 715px
    }

    @media(max-width: 768px){
        padding: 180px 20px 30px 20px;
        // min-height: 300px
    }
    

`



const Landing = (props)=>{
    const [imageDetail, setImageDetail] = useState({
        background: '',
        author: ''
    })

    const { state: { photo : {photos} = {} } = {} } = props 

    const { image, author } = randNum(photos) !== null ? randNum(photos) : '' 
    useEffect(()=>{
        setImageDetail({
            background: image,
            author
        })
    }, [])

    
    
    
    const landingImage = {
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)),url(${imageDetail.background})`,
       
    }
    return(
        <StyledLanding style={landingImage} className="landing">
            <div className='intro'>
                <span>You love beautify photos?</span>
                <h2>Explore a collection of stock photos by Pexels</h2>
            </div>
            <div className="full-width search-form">   
                <SearchForm 
                    {...props} 
                    withIcon 
                    placeholder='What are you looking for?' 
                    autoFocus='true'
                />
                <p className='grid align-c centered'>
                    <b>{imageDetail.author}</b>
                </p>
            </div>
        </StyledLanding>
    )
}


export default Landing