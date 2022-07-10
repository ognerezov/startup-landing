import {Auth, User} from "../model/user";
import {createContext} from "react";

export enum AuthState{
    UnAuthorized,
    WaitingForOtp,
    RequestingAuthorization,
    Authorized,
    AuthorizationForbidden
}

export interface UserContextService{
    auth : Auth
    setAuth : (auth : Auth) =>void
}

export const INITIAL_AUTH : Auth  = {
    state : AuthState.UnAuthorized
}

export const UserContext = createContext<UserContextService>({
    auth : INITIAL_AUTH,
    setAuth : auth => {}
})