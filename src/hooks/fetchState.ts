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

export function useFetchState<T,R>(path: string, method : string, def :T):[
    T, FetchState, number, (r :R)=>void
]{
    const [state,setState] = useState<FetchState>(FetchState.NotStarted);
    const [result, setResult] = useState<T>(def)
    const [error, setError] = useState<number>(NOT_STARTED)

    function submit(r : R){
        const body = JSON.stringify(r)
        const url = getUrl(path);
        console.log(url)
        const params : RequestInit = {
            method,
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            body
        }
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