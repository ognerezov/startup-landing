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
    data : any
    roles : string[]
}


export interface Auth{
    state : AuthState
    token ?: string
    user ?: User
}