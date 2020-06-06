import styled from 'styled-components';

const StyledPhoto = styled.div`
    margin: 0px 0px 5px 0px;
    position: relative;
    overflow: hidden;
    & img.payload{
        object-fit: cover;
        box-sizing: border-box;
        min-height: 150px;
        min-width: 100%
    }
    & .actions .author{
        flex: 3;
        align-items: center;
        color: #fff;
        margin: 0px;
    }
    &  .actions .author .author-detail{
        margin: 0px
    }
    & .actions .author img{
        height: 30px;
        width: 30px;
        border-radius: 100%;
        margin-left: 5px !important;
        border: 1.5px solid #fff;
        padding: 2px;
    }
    & .actions .action{
        flex: .75;
    }
    
    & .backdrop{
        position: absolute;
        bottom: -16px;
        width: 100%;
        box-sizing: border-box;
        left: 50%;
        transform: translateX(-50%);
        height: 20px;
        background: transparent;
        box-shadow: 0px -30px 50px rgba(0,0,0,1),
                    0px -35px 60px rgba(0,0,0,.8);
        z-index: 0;
        transition: .5s ease-out;
    }

    &.currentPhoto{
        display: flex;
        flex-direction: column-reverse
    }

    @media(min-width: 768px){
    // For current Image in view
        &.currentPhoto .actions{
            background: #fff;
            padding: 0px 30px !important;
            box-sizing: border-box;
            position: relative;
            border-radius: 0px;
            width: 100%;
            left: 0%;
            transform: translateX(0%);
            bottom: 0px;
            margin: 0px;
            visbility: visible;
            opacity: 1;
        }
        &.currentPhoto .actions  *{
            color: var(--secondary-color);
        }
        &.currentPhoto .actions .author .author-detail{
            font-size: 16px;
        }        
        &.currentPhoto .actions .author img{
            height: 40px;
            width: 40px;
            border: 1.5px solid #222;
            padding: 3px
        }
        &.currentPhoto .backdrop{
            box-shadow: none
        }
        &:hover > .actions{
            bottom: 0px !important;
        }
        &.currentPhoto .actions .action{
            max-width: 120px;
        }


    }

    // Hide actions on desktop view
    @media(min-width: 769px){
        & .actions {
            padding: 0px 5px !important;
            align-items: center;
            position: absolute;
            border-radius: 3px;
            width: 97%;
            left: 50%;
            transform: translateX(-50%);
            box-sizing: border-box;
            bottom: -10px;
            overflow: hidden !important;
            z-index: 1;
            visbility: hidden;
            opacity: 0;
            transition: .3s;
        }
        
        & .backdrop{
            visibility: hidden;
            opacity: 0;
        }
        &:hover .backdrop {
            visibility: visible;
            opacity: 1;
            transition: .5s ease-out;
        }
        &:hover > .actions{
            visbility: visible;
            opacity: 1;
            transition: .3s;
            bottom: -10px;
        }
    }

    @media(max-width: 768px){
        & .actions{
            background: #fff;
            padding: 0px 8px !important;
            box-sizing: border-box;
            position: relative;
            border-radius: 0px;
            width: 100%;
            left: 0%;
            transform: translateX(0%);
            bottom: 0px;
            margin: 0px;
        }
        & .actions .author{
            color: #222;
        }
        & .actions .author img{
            margin-left: 0px;
            border: 1px solid #222;
            padding: 2px;
        }
        & .backdrop{
            box-shadow: none
        }
    }
`

export default StyledPhoto