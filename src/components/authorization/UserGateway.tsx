import React, {FC} from 'react'
import {AuthState, UserContext} from "../../context/userContext";
import {EmailAuthorizer} from "./EmailAuthorizer";

interface UserGatewayProps {
    children?: React.ReactNode;
    quit : ()=>void
}

export const UserGateway : FC<UserGatewayProps> = ({children, quit}) => {
    return <UserContext.Consumer>{
        ({auth,setAuth})=>auth.user ? children :<EmailAuthorizer quit={
            ()=>{
                setAuth({...auth, state : AuthState.UnAuthorized})
                quit()
            }
        }/>}
    </UserContext.Consumer>
}