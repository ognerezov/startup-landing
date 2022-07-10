import {AuthState} from "../context/userContext";

export interface User{
    email ?: string
    phone ?: string
}

export interface Auth{
    state : AuthState
    otp ?: string|number
    token ?: string
    user ?: User
}