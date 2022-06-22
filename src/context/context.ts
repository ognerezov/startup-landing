import {createContext} from "react";
import {Item} from "../model/items";
import {Dict, ItemDict} from "../model/common";
import {IMAGE_CLOUDFRONT_URL, THUMBNAIL_CLOUDFRONT_URL} from "../config/ServerAddress";


export interface IItemContext{
    itemList ?: Item[]
    items ?: ItemDict
    images ?: Dict
}

export interface ItemContextService {
    context : IItemContext,
    setContext : (data : IItemContext) => void;
    selectedItem ?: number
    selectItem : (item ?: Item) => void
    onReport : (event : string) => void
}

export const ItemContext = createContext<ItemContextService>({
    context : {},
    setContext : data => {},
    selectItem : item =>{},
    onReport : event =>{}
});

export function imageUrl(key : string):string{
    return IMAGE_CLOUDFRONT_URL + key + '.jpg'
}

export function thumbnailUrl(key : string):string{
    return THUMBNAIL_CLOUDFRONT_URL + key + '.png'
}

export const DEFAULT_IMAGE = '/default';

export function expandItems(itemList : Item[]) : IItemContext{
    const images : Dict ={};
    const items : ItemDict = {};
    for(let item of itemList){
        images[item.id + ''] =  item.id + DEFAULT_IMAGE
        items[item.id + ''] = item
    }
    return {
        itemList,
        images,
        items
    }
}