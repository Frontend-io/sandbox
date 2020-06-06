import React from 'react';
import { withRouter } from 'react-router-dom' 
import "./App.css"
import RouterMain from './container/router/router';
import Header from './component/Common/header/header';
import Footer from './component/Common/footer/footer';
import Navigation from './component/Common/navigation/navigation';
import { Provider } from "react-redux"
import store from './container/redux/store/store';
import Alerts from './component/widget/alerts/alert';
import styled from 'styled-components';

const StyledAppWrapper = styled.section`
    @media(max-width: 768px){
        padding-top: 0px !important;
    }
`

const App = ({location: { pathname }})=>{
    const route = pathname.split('/')[1]
    const isHome = route === ''   ? true : false
    const adjustContent = {
        marginTop: isHome ? 0 : '60px',
        paddingTop: isHome ? 0 : '10px'
    }
    

        return(
           <Provider store={store}>
                <React.Fragment>
                    <Header route={route} isHome={isHome} />
                    <StyledAppWrapper style={adjustContent}>
                        <RouterMain />
                    </StyledAppWrapper>
                    <Alerts />
                </React.Fragment>
           </Provider>
        )
    }


export default withRouter(App)