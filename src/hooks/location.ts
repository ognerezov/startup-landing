import {useState} from "react";
import {Point} from "../model/geo";
import {DEFAULT_SPOT} from "../backend/GeoSearch";
import {getLocation} from "../services/GeolocationService";

export function useGeoLocation(initial : Point | undefined):
    [Point, (point : Point |undefined) => void]
{
    const [state, setState] = useState<Point>(initial || DEFAULT_SPOT);

    function fetchLocation(){
        getLocation()
            .then(setState)
    }
    fetchLocation()
    function set(point : Point | undefined){
        if(point){
            setState(point)
        } else{
            getLocation()
                .then(setState)
        }

    }

    return [state,set]
}
