import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { searching } from '../../../container/redux/actions/search-action/search-action-creator';




const StyledSearchForm = styled.form`
    max-width: 500px;
    flex: 4;
    & .form-fix{
        border: .5px solid transparent;
        background: #fcfcfc ;
    }
    & .form-fix:focus{
        border: .5px solid rgba(0,0,0, .05)
    }
    & i{
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        padding: 10px
    }
    & i:hover{
        color: #222
    }
` 


const StyledGeneralSearchResult = styled.div`
    position: absolute;
    background: #fff;
    width: 100% !important;
    max-height: 200px;
    overflow-y: auto;
    padding: 20px;
    top: 89%;
    border-top: 1px solid #f2f2f2;
    box-sizing: border-box;
    border-radius: 0px 0px 5px 5px;
    box-shadow: var(--mid-shadow);
    & p.await{
        color: var(--secondary-color)
    }
`



const SearchResult = ({typing, results}) =>{
    

    
    return(
        <>
            {
                typing ? 
                    <StyledGeneralSearchResult  className='general-search-result'>
                        <p className='centered-text await'> Searching...</p>
                    </StyledGeneralSearchResult>
                : null
            }
        </>
    )
}



const SearchForm = ({withIcon, dispatch, placeholder, autoFocus})=>{

    const [ isTyping, setIsTyping ] = useState(false)
    const [ searchTerm, setSerchTerm ] = useState('')
    const handleEvent = (e)=>{
        const { value } = e.target
        setSerchTerm(value)
    }

    useEffect(()=>{
        searchTerm ?  setIsTyping(true) : setIsTyping(false)
    }, [searchTerm])


    const beginSearch = (e)=>{
        e.preventDefault()
        dispatch(searching(searchTerm, 20))
        setSerchTerm('')
    }

    const variableForm = withIcon ? 
        {
            input: {
                padding: '20px',
                paddingRight: '45px',
                borderRadius: '3px !important',
                fontSize: '18px',
                border: '1px solid transparent',
                background: 'ffffff',
                transition: '.3s',
            },
            wrapper: {
                maxWidth: '100%' ,
                position: 'relative'
            }
        }
        : {}
    



    return(
        <StyledSearchForm className='relative searchForm' onSubmit={beginSearch} style={variableForm.wrapper}>
            <div className='relative field'>
                <input 
                value={searchTerm}
                onChange={handleEvent}
                type='text' 
                name='search' 
                placeholder={placeholder} 
                className='form-fix' 
                autoComplete='off'
                style={variableForm.input}
                autoFocus={autoFocus}
                />
                {
                    withIcon && 
                    <i onClick={beginSearch} type='submit' className='grey-t absolute material-icons'>search</i>
                }
            </div>
            <SearchResult typing={isTyping} />
        </StyledSearchForm>
    )
}


export default SearchForm