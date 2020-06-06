import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import styled from 'styled-components';
import randID from '../../../utilities/randID';
import { createCollectionSuccess, addToCollectionSuccess } from '../../../container/redux/actions/collections-action/collection-action-creator';
import shortenText from '../../../utilities/shortenText';
import getAttribute from '../../../utilities/getAttribute';
import isIncludedInArray from '../../../utilities/isIncludedInArray';


const StyledForm = styled.div`
    & button.btn{
        margin: 10px 0px;
        padding: 10px 30px;
        background: var(--darker-blue);
        box-shadow: var(--soft-shadow);
        color: #fff
    }
`
const CollectionList = styled.div`
    margin-bottom: 35px;

    & .categories{
        display: flex !important;
        align-items: stretch;
        flex-wrap: nowrap;
        padding-bottom: 10px;
        max-width: 800px;
        overflow: scroll;
    }
    & li {
        min-width: fit-content;
        border: 1px solid #eee;
        background: #fff;
        display: flex;
        align-items: center;
        margin: 5px;
        border-radius: 3px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 1.2rem;
        position: relative;
        overflow: hidden;
    }
   
    & .img{
        height: 30px !important;
        width: 30px;
        margin-right: 5px;
        border-radius: 100%;
        overflow: hidden;
        position: relative
    }
    & li img{
        height: 30px !important;
        width: 30px;
        object-fit: cover;
    }
    & li .cate-check{
        position: absolute;
        justify-content: center;
        left: 0%;
        height: 50px;
        width: 44px;
        background: rgba(76, 175, 80, 0.74);
        color: #fff;
        z-index: 9;
        text-align: center;
        padding: 5px 0px 0px 0px;
        box-sizing: border-box;
        font-size: 30px;
        border-radius: 0px 30px 30px 0px;    
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.30);
        transition: .5s;
    }
`

const Form = (props)=>{
    const { dispatch, state: { error } = {} } = props

    const [ collectionDetail , setCollectionInfo ] = useState({
        title: '',
        id: 3,
        description: '',
        isPrivate: false,
        photos: []
    })

    const eventHandler = (e)=>{
        const { value, name, type, checked } = e.target
        if(type === 'checkbox'){
            setCollectionInfo({
                ...collectionDetail,
                [name]: checked
            })
        }else if(e.type === 'submit'){
            e.preventDefault()
            dispatch(createCollectionSuccess(collectionDetail)) 
            setCollectionInfo({
                ...collectionDetail,
                title: '',
                description: '',
                id: ''
            })  
        }
        else{
            setCollectionInfo({
                ...collectionDetail,
                [name]: value
            })
        }
        

        

    }


    return(
        <form onSubmit={eventHandler}>
            <div className='field'>
                {
                    true &&
                    <small className='red-t'>{error}</small>
                }
                <input 
                    required
                    type='text' 
                    name='title'
                    value = {collectionDetail.title} 
                    onChange={eventHandler}
                    placeholder='Collection title' 
                    className='borderless form-fix' 
                />
            </div>
            <div className='field'>
                <textarea  
                    required
                    name='description' 
                    value={collectionDetail.description}
                    onChange={eventHandler}
                    placeholder='Short description ( Optional )' 
                    className='borderless form-fix' 
                    rows='4'
                />
            </div><br />
            <div className='field'>
                <label htmlFor='isPrivate'>
                    <input  
                        value={collectionDetail.isPrivate}
                        onChange={eventHandler}
                        type='checkbox'
                        name='isPrivate'
                    />
                    Make collection private?
                </label>
            </div>
            <div className='field'>
                <button type='submit' className='btn'>Create collection</button>
            </div>
        </form>
    )
}


export const CategoryList = (props)=>{
    const { payload,title, photos, id, handleCollectionToAdd } = props || {}
    const length = photos ? photos.length : null
    // Return the very first image in the collection as cover because its more likely to no change
    const albumCover = length > 1 ? photos[ length - 1 ].url : null
    const useTitle = shortenText(title,3,'...')
    const imageExistsInCollection = isIncludedInArray( photos,payload)
   


    

    
    

    return(
        <li 
            onClick={handleCollectionToAdd} 
            data-category={title} 
            data-category-id={id} 
            className={`${ imageExistsInCollection && 'added'} link mat shadow`} 
            key={randID()}>
                {
                    imageExistsInCollection &&
                    <span className='cate-check'>&#10003;</span>
                }
                <div className='img'>
                    {
                        albumCover && <img src={albumCover} height='30' width='30' alt={'cover'} />
                    }
                </div>
                {useTitle} &nbsp;
                {length}
        </li>
    )
}

// Main Component
const AddToCollection = props =>{
    const { 
        payload, 
        type, 
        handleFixHeight, 
        dispatch, 
        state: { 
            collections 
        } = {} 
    } = props
    const [ isFormVisible, setIsFormVisible ] = useState(false)

    useEffect(()=>{
        setIsFormVisible(
            type === 'create' ? true : false
        )
    }, [type])



    // Adjust modal height responsively
    const handleEvent = ()=>{
        setIsFormVisible(true)
        handleFixHeight()
    }

    // Handle real time refresh to enable highlighting selected category
    const [ refresh, setRefresh ] = useState(false)
    
    const handleCollectionToAdd = (e)=>{
        const selectedCategory = getAttribute(e.target, 'category-id')
        const dispatchPayload = {
            id: selectedCategory,
            imageId: payload
        }
        // Add image to collection
        dispatch (addToCollectionSuccess(dispatchPayload) )
        setRefresh(!refresh)
    }




    return(
        
        <StyledForm>
            {
                // Hide the "Add to collection buttons" if there is no payload to add
                payload !== undefined ? 
                <CollectionList>
                   <div className='margin-bottom-10 categories'>
                        {
                            collections.map(album=>{
                                return(
                                    <CategoryList refresh={refresh} {...album} payload={payload} handleCollectionToAdd={handleCollectionToAdd} key={randID()} />
                                )
                            })  
                        } 
                    </div>    
                    <NavLink 
                        to='/@mush/#collection'>See all your collections...
                    </NavLink><br /> 
                    {
                        !isFormVisible && 
                        <>
                            <button onClick={handleEvent} className='green btn padded-10 '>Create new collection instead</button> 
                        </>
                    }
                </CollectionList>
                : null
            }
            
            {
                isFormVisible &&  
                <Form  {...props}/>
               
            }            
        </StyledForm>
    )
}



const mapStateToProps = (state) => ({
    state: state.collection
})
const mapDispatchToProps = (dispatch)=>{
    return{
        dispatch: action =>{dispatch(action)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddToCollection)