import React from 'react'
import { connect } from 'react-redux'

import Photo from '../widget/photo/photo'
import EmptyContent from '../widget/empty-content/empty-content';
import randID from '../../utilities/randID';
import { StyledResponsivePhotoTab } from './photo-tab';





const Likes = ({ state: { likedPhotos } }) =>{
    
    
    


    return(
        <>
            {
                likedPhotos.length ? 
                    <StyledResponsivePhotoTab>
                        <div className='liked-photos'>
                            {
                                likedPhotos.map( item =>{
                                    return <Photo payload={item} key={randID()} />
                                } )
                            }
                        </div>
                    </StyledResponsivePhotoTab>
                : 
                    <EmptyContent 
                        title='You have not liked any photos, click on the heart icon on any photo you like to add it here'>
                        <svg 
                            className='resize'
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24">
                            <path d="M6.084 4c1.379 1.612 2.576 3 4.916 3h11v13h-20v-16h4.084zm.916-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3zm3.715 9.652l-2.921.404 2.125 2.042-.518 2.902 2.599-1.39 2.599 1.39-.518-2.902 2.125-2.042-2.921-.404-1.285-2.652-1.285 2.652z"/>
                        </svg>
                    </EmptyContent>
            }
        </>
    )
}








const mapStateToProps = state =>{
    return{
        state: state.like
    }
}

export default connect(mapStateToProps)(Likes)