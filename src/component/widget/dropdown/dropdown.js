import React, { useState } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import randID from '../../../utilities/randID';
import { fetchPhoto } from '../../../container/redux/actions/photo-action/photo-action-creator';


const StyledDropdown = styled.div`
    position: relative;
    display: flex;
    & button {
        margin-left: 0px !important;
        border-radius: 0px !important;
        text-transform: capitalize;
        padding: 5px 20px;
        min-width: 100px;
        background: #fff;
        border: 1px solid #eee;
    }
    @media(min-width: 768px){
        min-width: 200px;
        padding: 5px 20px;
    }
    & .content{
        visibility: hidden;
        font-size: 16px;
        opacity: 0;
        background: #fff;
        position: absolute;
        width: 85%;
        top: 100px;
        box-sizing: border-box;
        z-index: 99;
        box-shadow: 0px 5px 10px rgba(0,0,0,.08);
        border: 1px solid #eee;
        z-index: 99;
        transition: all .3s ease-out;
        height: 0px;
        overflow-y: auto
    }

    &.visible .content{
        visibility: visible;
        opacity: 1;
        top: 50px;
        transition: all .3s ease-out;
        height: 250px
    }
    & .content.paragraph{
        padding:  0px 10px;
    }
    & .content.list {
        display: flex;
        flex-direction: column;
    }
    & .content.list > *{
        border-bottom: 1.2px solid #f2f2f2;
        padding: 10px 15px;
    }
    & .content.list > *:last-child{
        border: none
    }
    & .content.list > *:hover{
        background: #f2f2f2;
    }
    @media(max-width: 768px){
        &.visible .content{
            width: 100%;
        }
    }
    

`

const Dropdown = (props)=>{
    const { type, data, dispatch } = props
    const [visible, setVisible] = useState(false)
    const [ category, setCategory ] = useState('Trending')
    const classes = visible ? "visible drop-down" : "drop-down"
    

    const handlClick = ()=>{
        visible ? setVisible(false): setVisible(true)
    }
    const selectOption = (e)=>{
        const value = e.target.getAttribute('data-value')
        setCategory(value)
        setVisible(false)

        // DISPATCH AND FETCH NEW CATEGORY
        dispatch(fetchPhoto(value))
    }
    // Dropdown icon
    const icon = visible ? 'arrow_drop_up' : 'arrow_drop_down'
    
    

    return(
        <StyledDropdown className={classes}>
            <input value={category} type="hidden"  />
            <button onClick={handlClick} className="full-width grid align-c apart ">
                <span>{category}</span> 
                {
                    props.type === 'list' &&
                    <i className="material-icons">{icon}</i>
                }
            </button>
            <div className={`content ${type === "list" ? "list" : "paragraph"}`}>
               {
                   data.map( option => {
                       const { title, value } = option
                       return <li data-value={value} onClick={selectOption} className="link" key={randID()}>{title}</li>
                   })
               }
            </div>
        </StyledDropdown>
    )
}

Dropdown.propTypes = {
    type:PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.string)
}
Dropdown.defaultProps = {
    type : "list"
}



export default Dropdown