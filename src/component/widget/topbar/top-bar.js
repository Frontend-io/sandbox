import React from 'react';
import styled from 'styled-components';

const StyledTopBar = styled.div`
    & h1 {
        text-transform: capitalize;
        text-shadow: 1px 1px 1px rgba(0,0,0,.1);
        font-size: clamp(16px, 30vw, 30px)
    }
    & p{
        text-shadow: 1px 1px 1px rgba(0,0,0,.08);
        margin: 5px 0px ;
        line-height: 23px
    }
    & p:first-letter{
        text-transform: uppercase
    }
    & small.extra {
        background: #fff;
        padding: 5px 10px;
        display: inline-block;
        color: #777;
        border-radius: 50px;
        margin-top: 3px;
    }
    & small.extra  i{
        top: 1px;
        font-size: 14px;
        margin: 0px 5px 0px 0px !important;
    }
    @media(max-width: 500px){
        padding: 20px 10px 10px 10px !important;
        & h1 {
            font-size: clamp(16px, 30vw, 18px)
        }
        
    }

`




const TopBar = ({title, description, cover, customHeight, extra})=>{
    
    const coverImage = cover ? cover : "https://images.pexels.com/photos/4045428/pexels-photo-4045428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    const background = `linear-gradient(to right,  rgba(28, 53, 62, 0.93), rgba(43, 44, 47, 0.23)),url(${coverImage})`
    const topBarStyle = {
        color: '#fff',
        background,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: customHeight 
    }
    const style = customHeight ? { paddingBottom: '100px' } : null

    
    return(
        <StyledTopBar style={topBarStyle} className='padded-20 top-bar'>
            <div style={style} className='container'>
                <h1>{title}</h1>
                <p className='tag-line'>{description}</p>
                 {
                     extra &&
                    <small className='grid align-c extra'>
                        <i className='material-icons'>{extra.icon}</i>
                        {extra.des}
                    </small>
                 }
            </div>   
        </StyledTopBar>
    )
}


export default TopBar