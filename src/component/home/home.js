import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';
import Landing from '../landing/landing';
import Gallery from '../gallery/gallery';
import { fetchPhoto } from '../../container/redux/actions/photo-action/photo-action-creator';
import SearchResult from '../search-result/search-result';

const StyledHome = styled.section`
    
`

const Home = (props)=>{
    const { dispatch, state:{ photo: { photos } }} = props
    useEffect(()=>{
        dispatch(fetchPhoto())
    }, [dispatch])

    
    return(
       <StyledHome className='home-wrapper'>
            {   photos &&
                <Landing {...props} />
            }
            {
                <SearchResult {...props} />
            }
            <Gallery {...props} />
       </StyledHome>
    )
}



const mapStateToProps = state =>{
    return{
        state
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        dispatch: (action)=>{
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)