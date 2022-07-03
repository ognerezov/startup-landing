import {AddItemRequest, prepared, toFormData} from "../model/items";
import {getUrl} from "../config/ServerAddress";


export async function creatItem(item: AddItemRequest) {
    const prep = toFormData(prepared(item));
    const url = getUrl("items");
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            redirect: 'follow',
            body: prep
        });
        if (response.status <200 || response.status >=300){
            throw response.status
        }
    return await response.json();
}