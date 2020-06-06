import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'

import { ReactComponent as MenuSvg } from '../../../../assets/menu-thin.svg'
import { ReactComponent as MenuOpenSvg } from '../../../../assets/menu-fill.svg'
import { ReactComponent as UserSvg } from '../../../../assets/user.svg'
import { ReactComponent as UploadSvg } from '../../../../assets/upload.svg'

import styled from 'styled-components';
import Navigation from '../../navigation/navigation';


const StyledExtraNav = styled.ul`
    flex: .5;
    box-sizing: border-box;
    padding: 0px;
    &  svg {
        cursor: pointer;
        fill: #777;
    }
    & svg:hover{
        fill: var(--secondary-color);
    }
    & .upload {
        margin-right: 5px;
    }
    @media(min-width: 769px){
        & > a {
            margin: 0px 20px 
        }
    }
    @media(max-width: 768px){
        & > a:nth-child(2) {
             display: none
        }
    }
`

const CompactNav = ({isHome})=>{

    const [ openNav, setOpenNav ] = useState(false)
    const handleNav = ()=>{
        setOpenNav(!openNav)
    }

    const adjustIcons =  isHome ? {
        fill:  '#fff',
        background: 'rgba(0,0,0,.1)',
        borderRadius: '100%',
        padding: '8px'
    }
    : null

    return(
        <>
            <StyledExtraNav className='no-wrap grid align-c centered extras'>
                <NavLink title="Upload" to="/upload">
                    <UploadSvg style={adjustIcons}/>
                </NavLink>
                <NavLink title="Profile" to="/@musa">
                    <UserSvg style={adjustIcons}/>
                </NavLink>
                <NavLink to={'#'}>
                    {
                        openNav ? 
                        <MenuOpenSvg onClick={handleNav}  style={adjustIcons} />
                        :
                        <MenuSvg onClick={handleNav}  style={adjustIcons}/>
                    }
                </NavLink>
            </StyledExtraNav>
            <Navigation closeNav={handleNav} isOpen={openNav}/>
        </>
    )
} 


export default CompactNav