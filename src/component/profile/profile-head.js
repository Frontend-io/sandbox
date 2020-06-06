import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'


const StyledProfileHead = styled.div`
    
    & .img-avatar{
        height: 120px;
        width: 120px;
        border-radius: 100%;
        background: #eee;
        box-sizing: border-box;
        margin-right: 25px;
        position: relative;
        top: 20px;
        overflow: hidden;
    }
    & .img-avatar img{
        object-fit: cover
    }
    & .about{
        position: relative;
        margin-bottom: -8px;
    }
    & .img-avatar img{
        object-fit: cover
    }
    & .about .author > * {
        letter-spacing: 1.2px;
        margin-top: 5px;
    }
    & .about .follow-btn{
        padding: 8px 30px;
        color: #fff;
        font-weight: 600;
        background: var(--light-green)
    }
    & .about .followers .follow-img{
        height: 30px;
        width: 30px;
        overflow: hidden;
        background: #eee;
        margin-right: -15px;
        border-radius: 100%;
        box-sizing: border-box !important
    }
    & .about .followers .follow-img {
        object-fit: contain
    }
    & .about .followers .follow-img:last-child{
        font-size: 7px;
        line-height: 1;
        text-align: center;
        padding: 6px 0px 0px 2px;
        font-weight: 600;
        border: .1px solid #aaa;    
    }

    @media(max-width: 768px){
        & .about .author > * {
            margin-top: 0px;
        }

        & .img-avatar{
            height: 110px;
            width: 110px;
            top: 20px;
        }
        & .about .author .name {
            font-size: 1.2em
        }
        & .about .author .id-origin{
            font-size: 14px;
        }
        & .about .follow-btn{
            padding: 0px 10px !important;
            font-size: 14px;
            height: 30px
        }
    }

    @media(max-width: 416px){ 
        & .img-avatar{
            height: 80px;
            width: 80px;
            top: 0px;
            margin-right: 15px;
        }
        & .about .follow-btn{
            padding: 0px 10px !important;
            font-size: 12px;
            height: 30px
        }

    }



` 


const ProfileHead = (props)=>{

    const { name, userName, location, followers, avatar } = props.userInfo
    const parseCount = (value)=>{
        return value > 1000 ? `${ value/1000 }K` : value
    }

    return(
        <StyledProfileHead className="grid align-c profile-head">
            <div className="img-avatar">
                <img src={avatar} alt={`${userName}'avatar`} />
            </div>
            <div className="grid align-e about">
                <div className='author'>
                    <h2 className='name'>{ name }</h2>
                    <p className='id-origin no-margin'>{ userName } | { location }</p>
                    <div className='align-c grid stats'>
                        <button className='follow-btn'>Following | { parseCount(followers) } </button>
                        <div className='grid followers'>
                            <NavLink to='/' className='follow-img'>
                                <img src={avatar} alt=''/>
                            </NavLink>
                            <NavLink to='/' className='follow-img'>
                                <img src={avatar} alt=''/>
                            </NavLink>
                            <NavLink to='/' className='follow-img'>
                                <img src={avatar} alt=''/>
                            </NavLink>
                            <NavLink to='/' className='follow-img'>1k More</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </StyledProfileHead>
    )
}

export default ProfileHead