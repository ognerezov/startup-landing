import {AddItemRequest, prepared, toFormData} from "../model/items";
import {getUrl} from "../config/ServerAddress";
import {bearer} from "../hooks/fetchState";


export async function creatItem(item: AddItemRequest, token : string) {
    const prep = toFormData(prepared(item));
    const url = getUrl("customer/item");
        const response = await fetch(url, {
            method: 'POST',
            // mode: 'cors',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            redirect: 'follow',
            credentials : 'include' ,
            headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:8080, https://app.rentsby.com, https://rentsby.com, https://89kkdndqhb.execute-api.eu-west-1.amazonaws.com',
                    'Authorization' : bearer(token),
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                },
            body: prep
        });
        if (response.status <200 || response.status >=300){
            throw response.status
        }
    return await response.json();
}