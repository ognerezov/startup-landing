import {useState} from "react";
import {getUrl} from "../config/ServerAddress";

export enum FetchState{
    NotStarted,
    InProgress,
    Finished
}

const PARSE_ERROR = -1;
const OTHER_FETCH_ERROR = -2;
const NOT_STARTED = -200;

export function getErrorMessage(errorCode : number){
    return 'Error.default';
}

export function bearer(token : string){
    return "Bearer " + token;
}

export function useFetchState<T,R>(path: string, method : string, def :T):[
    T, FetchState, number, (r :R, auth ?: string)=>void
]{
    const [state,setState] = useState<FetchState>(FetchState.NotStarted);
    const [result, setResult] = useState<T>(def)
    const [error, setError] = useState<number>(NOT_STARTED)

    function submit(r : R, auth ?: string){
        let url = getUrl(path);
        console.log(auth)
        console.log(url)
        let body
        if (typeof  r ==='string'){
            url += r
        }else {
            body = JSON.stringify(r)
        }
        console.log(url)
        const params : RequestInit = {
            method,
            mode: auth ? undefined : 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            credentials : auth ? 'include' : undefined,
            headers: auth ? {
                'Access-Control-Allow-Origin': 'http://localhost:8080, https://app.rentsby.com, https://rentsby.com, https://89kkdndqhb.execute-api.eu-west-1.amazonaws.com',
                'Authorization' : auth,
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Content-Type': 'application/json'
            } : {
                'Content-Type': 'application/json'
            },
            body
        }
        console.log(params)
        setState(FetchState.InProgress);
        fetch(url,params)
            .then(response =>{
                setError(response.status)
                setState(FetchState.Finished)
                if (response.status <200 || response.status >=300){
                   return
                }
                response
                    .json()
                    .then(setResult)
                    .catch(()=>setError(PARSE_ERROR))
            }).catch(e=>{
                setState(FetchState.Finished)
                setError(OTHER_FETCH_ERROR)
        })
    }

    return [result,state,error,submit]
}