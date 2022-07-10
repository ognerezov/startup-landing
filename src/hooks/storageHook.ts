import {useState} from "react";
import {load, save} from "../storage/localStorage";

export function useStorage<T>(key : string, def : T) : [T, (t:T)=>void]{
    const [state,setState] = useState<T>(load(key,def))

    const set : (t:T)=>void = (t:T)=>{
        save(t,key);
        setState(t);
    }

    return [state,set]
}