export interface EmailRequest{
    email : string
}

export interface BasicResponse{
    message : string
}

export interface ValueResponse{
    value : string
}


export const EMPTY_RESPONSE : BasicResponse = {message : ""}
export const EMPTY_VALUE_RESPONSE : ValueResponse = {value : ""}