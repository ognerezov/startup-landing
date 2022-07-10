export interface EmailRequest{
    email : string
}

export interface BasicResponse{
    message : string
}

export const EMPTY_RESPONSE : BasicResponse = {message : ""}