import React from 'react'
import styled from 'styled-components'; 
import Related from '../widget/related-images/related-image';
import { searchingEnd } from '../../container/redux/actions/search-action/search-action-creator';


const StyledSearchResult = styled.div`
    padding: 0px 20px 20px 20px;
    margin: 20px auto;
    transition: .5s;
    max-width: 85%;
    position: relative;
    top: -130px;
    background: #fff;
    border-radius: 5px;
    animation: swipe .3s ease-out ;

    @keyframes swipe{
        from {
            top: 0px
        }
        to{
            top: -130px
        }
    }
    &.photo{
        max-width: 100%
    }

    & .search-term{
        padding: 20px 0px;
        text-align: center;
    }
    & .head{
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
        color: #222
    }
   
    & .related-content{
        column-count: 4;
    }
           
    @media(max-width: 1000px){
        & .related-content{
            column-count: 3;
        }
        & .related-content .photo{
            max-width: auto
        }
    }

    @media(max-width: 768px){
        top: -100px;

        @keyframes swipe{
            from {
                top: 0px
            }
            to{
                top: -100px
            }
        }

        & .related-content{
            column-count: 2;
        }
        & .search-term{
            font-size: 16px
        }
    }
    @media(max-width: 600px){
        & .related-content{
            column-count: 1;
        }
        & .search-term{
            font-size: 14px
        }
    }
}

`


const SearchResult = (props)=>{
    const { dispatch, state: { search: { result, searchTerm, isSearching } } } = props

    const handleClick = ()=>{
        dispatch(searchingEnd())
    }


    return(
        <React.Fragment>
            {
               result && isSearching ?
                <StyledSearchResult className='animated searchResult'>
                    <div className='centered-text search-term'>
                        {result.length} {result.length > 1 ? 'Results' : 'Result'} for &nbsp;
                        <b>{searchTerm.toUpperCase()}</b> &nbsp; |  &nbsp;
                        <span onClick={handleClick} className='link red-t'>Close Search</span>
                    </div>
                    {
                        result.length ? <Related term={searchTerm} data={result} /> 
                        :
                        <h3 style={{minHeight: 80}} className='centered-text'>Sorry, your search didn't return any match</h3>
                    }
                </StyledSearchResult>
                : null
            }
        </React.Fragment>
    )
}

export default SearchResult