import React from 'react';
import styled from 'styled-components';



const Location = styled.div`
    color: #fff;
    margin: 0px;
    padding: 0px;
    letter-spacing: 1.2px;
    align-items: center;
    & i {
        top: 0px;
        font-size: 14px;
        color: #fff;
        margin: 0px;
        padding: 0px !important;
    }
    & p{
        font-size: 10px;
    }
    @media(max-width: 768px){
        color: var(--secondary-color);
        & i {
            color: var(--secondary-color)
        }
    }
`



const PhotoLocation= ({location})=>{

    return(
        <Location className='grid photo-location '>
            <i className='material-icons'>location_on</i>
            <p>{location}</p>
        </Location>
    )
}


export default PhotoLocation