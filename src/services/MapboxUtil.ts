import {Map} from 'mapbox-gl';
import {Dict} from "../model/common";
import {thumbnailUrl} from "../context/context";
import {Point} from "../model/geo";
import {Address, extractAddress} from "../model/address";

export type ImageResponse = HTMLImageElement | ImageBitmap | undefined ;
export const ACCESS_TOKEN = 'pk.eyJ1IjoicG9sYXJvc28iLCJhIjoiY2w0NWx0OHA3MDI3bTNrbjZyeWIxcG95aSJ9.XJVCOv41BrAzsKm9Ye2ygQ'

export interface Images{
    [key: string] : ImageResponse | null
}

export function fetchAddress(point : Point):Promise<Address>{
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        point.lon +
        "," +
        point.lat +
        ".json?access_token=" +
        ACCESS_TOKEN +
        "&types=address";

    return new Promise<Address>((resolve, reject) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.features.length > 0) {
                    const address = extractAddress(data.features[0]);
                    resolve(address)
                } else {
                    reject("404")
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function loadImages(map : Map, urls : Dict, callback : (urls : Images)=>void) {
    const results : Images = {};
    for (const name in urls) {
        map.loadImage(thumbnailUrl(urls[name]), makeCallback(name));
    }

    function makeCallback(name : string) {
        return (err : Error | undefined, image : ImageResponse) => {
            results[name] = err ? null : image;
            if (Object.keys(results).length === Object.keys(urls).length) {
                console.log(results)
                callback(results);
            }
        };
    }
}