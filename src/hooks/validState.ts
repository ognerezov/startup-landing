import {useState} from "react";

export type StateId = string | number | undefined;

export function useValidState<T>(initial : T,
                                 validate:(t :T)=>StateId ):
                            [T,StateId, (t:T) => void]
{
    const [state, setState] = useState<T>(initial);
    const [error, setError] = useState<StateId>();

    function set(t : T){
        const e = validate(t);
        setError(e)
        setState(t)
    }

    return [state,error,set]
}