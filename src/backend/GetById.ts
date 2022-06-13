import {getUrl} from "../config/ServerAddress";

export async function getItemById(id : number|string){
    console.log('get item by id '+ id);
    const url = getUrl("items/"+id);
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    });
    return response.json();
}
