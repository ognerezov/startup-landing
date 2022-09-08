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
    timeZone : string
    availability ?: Availability
}

export interface TimeRecord{
    date : Date
    dateTime  : string
    timeZone : string;
}


export interface Availability{
    start : TimeRecord
    end : TimeRecord
    recurrence : string[]
    endTimeUnspecified : boolean
}

export const ANONYMOUS : User ={
    id : 0,
    roles : [],
    timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const NO_AUTH : Auth = {
    state : AuthState.UnAuthorized,
}

export interface Auth{
    state : AuthState
    token ?: string
    user ?: User
}
