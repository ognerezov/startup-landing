import {AuthState} from "../context/userContext";

export interface User{
    id : number
    firstName ?:string
    lastName ?: string
    document ?: number
    avatar ?: number
    area ?: number
    email ?: string
    phone ?: string
    data ?: any
    roles : string[]
}

export const ANONYMOUS : User ={
    id : 0,
    roles : []
}

export const NO_AUTH : Auth = {
    state : AuthState.UnAuthorized,
}

export interface Auth{
    state : AuthState
    token ?: string
    user ?: User
}