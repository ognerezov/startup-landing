import {AddItemRequest, EditItemRequest, prepared, toFormData} from "../model/items";
import {getUrl} from "../config/ServerAddress";
import {bearer} from "../hooks/fetchState";


export async function creatItem(item: AddItemRequest, token : string) {
    const prep = toFormData(prepared(item));
    const url = getUrl("customer/item");
        const response = await fetch(url, {
            method: 'POST',
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
        if (response.status <200 || response.status >=400){
            throw response.status
        }
    return await response.json();
}

export async function updateItem(item: EditItemRequest, token : string) {
    const url = getUrl("customer/items");
    const body = JSON.stringify(item)
    // console.log(bearer(token))
    // console.log(body)
    const response = await fetch(url, {
        method: 'PUT',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow',
        credentials : 'include' ,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080, http://192.168.1.37:8080,  https://app.rentsby.com, https://rentsby.com, https://89kkdndqhb.execute-api.eu-west-1.amazonaws.com',
            'Authorization' : bearer(token),
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Content-Type': 'application/json'
        },
        body
    });
    if (response.status <200 || response.status >=400){
        throw response.status
    }
}
