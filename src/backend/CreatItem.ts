import {AddItemRequest, prepared} from "../model/items";
import {getUrl} from "../config/ServerAddress";


export async function creatItem(item: AddItemRequest) {
    const prep = prepared(item);
    console.log(prep)
    const url = getUrl("items/");
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(prep)
        });
        if (response.status <200 || response.status >=300){
            throw response.status
        }
    return await response.json();
}