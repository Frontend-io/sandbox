import React from 'react';
import styled from 'styled-components';
import Logo from '../logo/logo';
import screenSize from '../../../utilities/checkScreenSize';


const StyledLoader = styled.div`
    padding: 20px;
    z-index: 999;
    background: #fff;
`
const Loader = ({message})=>{
  
    const { innerHeight } = screenSize()
    const style={
        top: (innerHeight*30/100) + 'px'
    }

    return(
        <StyledLoader style={style} className="grid centered">
            <div className="grid col">
                <Logo loading black />
                <p className="no-margin">{message}</p>
            </div>
        </StyledLoader>
    )
}


export default Loader