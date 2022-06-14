import {Map} from 'mapbox-gl';
import {Dict} from "../model/common";

export type ImageResponse = HTMLImageElement | ImageBitmap | undefined ;
export interface Images{
    [key: string] : ImageResponse | null
}

export function loadImages(map : Map, urls : Dict, callback : (urls : Images)=>void) {
    const results : Images = {};
    for (const name in urls) {
        map.loadImage(urls[name], makeCallback(name));
    }

    function makeCallback(name : string) {
        return (err : Error | undefined, image : ImageResponse) => {
            results[name] = err ? null : image;
            if (Object.keys(results).length === Object.keys(urls).length) {
                callback(results);
            }
        };
    }
}