import React from 'react'
import { Route, Redirect } from "react-router-dom"


export const ProtectedRoute = ( {component: Component, ...rest }) => {


    return(
        <Route 
            {...rest}
            render = {props =>{
                if(2+3 === 5) {
                    return <Component {...props} />
                }else{
                    return <Redirect to={
                        {
                            pathName: "/",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }}
        />
    )
}