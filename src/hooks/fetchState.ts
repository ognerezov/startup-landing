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
    switch (errorCode) {
        default:
        return 'Error.default';
        case 401:
            return 'Error.unauthorized'
        case 403:
            return 'Error.forbidden'
        case 0:
            return 'Error.network'
    }
}

export function bearer(token : string){
    return "Bearer " + token;
}

export function useFetchState<T,R>(path: string, method : string, def :T):[
    T, FetchState, number, (r :R, auth ?: string, voidResult ?:boolean)=>void,()=>void
]{
    const [state,setState] = useState<FetchState>(FetchState.NotStarted);
    const [result, setResult] = useState<T>(def)
    const [error, setError] = useState<number>(NOT_STARTED)

    function reset (){
        setResult(def)
        setError(NOT_STARTED)
        setState(FetchState.NotStarted)
    }

    function submit(r : R, auth ?: string, voidResult ?:boolean){
        let url = getUrl(path);
        console.log(auth)
        let body
        if (typeof  r ==='string'){
            url += r
        }else {
            body = JSON.stringify(r)
        }
        console.log(url)
        console.log(body)
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
                if (response.status <200 || response.status >=400 || voidResult){
                   return
                }
                response
                    .json()
                    .then(setResult)
                    .catch(()=>setError(PARSE_ERROR))
            }).catch(e=>{
                console.log(e)
                setState(FetchState.Finished)
                setError(OTHER_FETCH_ERROR)
        })
    }

    return [result,state,error,submit,reset]
}
