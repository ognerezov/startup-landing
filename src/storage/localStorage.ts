import {Auth} from "../model/user";
import {INITIAL_AUTH} from "../context/userContext";

export const STORAGE_AUTH = 'RentsBy auth'

export function getAuth():Auth{
    const stored : string|null = localStorage.getItem(STORAGE_AUTH)

    if (!stored) return INITIAL_AUTH;

    try{
        return  JSON.parse(stored);
    }catch (e){
        console.log(e)
    }
    return INITIAL_AUTH
}

export function load<T>(key : string, def : T) :T{
    const stored : string|null = localStorage.getItem(key)

    if (!stored) return def;

    try{
        return  JSON.parse(stored);
    }catch (e){
        console.log(e)
    }
    return def;
}

export function saveAuth(auth : Auth){
    localStorage.setItem(STORAGE_AUTH, JSON.stringify(auth))
}

export function save<T>(t : T, key : string){
    localStorage.setItem(key, JSON.stringify(t))
}
