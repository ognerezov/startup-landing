import {Point} from "../model/geo";

export function getLocation():Promise<Point>{
    return new Promise((resolve, reject)=>{
        if (!navigator.geolocation) {
            reject('Geolocation not available')
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    lat : position.coords.latitude,
                    lon : position.coords.longitude
                })
            }, () => {
                reject('Unable to retrieve your location');
            });
        }
    })


}