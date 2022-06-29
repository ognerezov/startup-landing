import {getUrl} from "../config/ServerAddress";
import {Spot} from "../model/geo";

export const DEFAULT_SPOT : Spot = {
    radius : 30000,
    lon : -0.37567,
    lat : 39.46885
}

export async function findByCategoryNearBy(category : number, spot : Spot = DEFAULT_SPOT){
    console.log('geo search for category '+ category);
    const url = getUrl("items/category/"+category);
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
         body: JSON.stringify(spot)
    });
    return response.json();
}
