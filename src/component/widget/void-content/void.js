import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import Logo from '../logo/logo'
import screenSize from '../../../utilities/checkScreenSize';



const StyledVoid = styled.div`
    z-index: 1;
    position: relative;
    display: flex;
    color: #aaa;
    & .title{
        max-width: 1000px;
        width: 90%;
        margin: 5px auto;
        color: #777;
    }
    & .description{
        max-width: 1000px;
        margin: 0px auto;
    }

    @media(max-width: 500px){
        & .title {
            font-size: 1.3em;
        }
        & .description{
            max-width: 95%;
        }

    }
` 


export const Void = ({ title, description, link, adjustposition })=>{
    const { innerHeight } = screenSize()

    const style = adjustposition ? 
    {
        top: (innerHeight*30/100) + 'px'
    } 
    : 
    {
        paddingTop: '100px'
    }

    return(
        <StyledVoid style={style} className="grid col grey-t centered-text void">
            <Logo black />
            {   title &&
                <h2 className='title'>{title}</h2>
            }
            {
                description &&
                <p className='description'>{description}</p>
            }
            {
                link && 
                <NavLink to={`${link}`} />
            }
        </StyledVoid>
    )
}

export default Void