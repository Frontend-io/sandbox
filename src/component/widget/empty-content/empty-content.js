import React from 'react'
import styled from 'styled-components';

const StyledEmptyContent = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px 20px ;


    &  p {
        font-size: 18px;
        max-width: 800px;
        margin: 10px auto;
    }
    &  svg.resize {
        height: 80px;
        width: 80px;
        fill: #aaa;
    }
    
` 

const EmptyContent = ({title, children})=>{

    return(
        <StyledEmptyContent className='centered-text empty'>
            <div className=''>
                {children}
                <p>{title}</p>
            </div>
        </StyledEmptyContent>
    )
}

export default EmptyContent