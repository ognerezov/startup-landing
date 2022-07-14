import React, {FC} from 'react'
import {AuthState, UserContext} from "../../context/userContext";
import {EmailAuthorizer} from "./EmailAuthorizer";
import {ProfileEditor} from "./ProfileEditor";

interface UserGatewayProps {
    children?: React.ReactNode;
    quit : ()=>void
}

export const UserGateway : FC<UserGatewayProps> = ({children, quit}) => {
    return <UserContext.Consumer>{
        ({auth,setAuth})=>auth.user ?
            (auth.user.firstName ? children :
                <ProfileEditor auth={auth} setAuth={setAuth} quit={quit}/>
            ) :
            <EmailAuthorizer auth={auth} setAuth={setAuth}
                 quit={
                    ()=>{
                        setAuth({...auth, state : AuthState.UnAuthorized})
                        quit()
                    }
            }/>
    }
    </UserContext.Consumer>
}