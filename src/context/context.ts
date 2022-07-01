import {createContext} from "react";
import {AddItemRequest, Item} from "../model/items";
import {Dict, ItemDict} from "../model/common";
import {IMAGE_CLOUDFRONT_URL, THUMBNAIL_CLOUDFRONT_URL} from "../config/ServerAddress";
export const JPG = '.jpg';
export const PNG = '.png';


export interface IItemContext{
    itemList ?: Item[]
    items ?: ItemDict
    images ?: Dict
}

export enum EditState{
    NotStarted,
    Started,
    Submitting,
    Submitted,
    Error
}

export interface ItemEditContext{
    id ?: number
    category ?: number
    submit :(item : AddItemRequest)=>void
    state : EditState
}

export function noneItemEditContext(submit :(item : AddItemRequest)=>void) :ItemEditContext{
    return {
        submit,
        state : EditState.NotStarted
    }
}

export interface ItemContextService {
    context : IItemContext,
    setContext : (data : IItemContext) => void;
    selectedItem ?: number
    selectItem : (item ?: Item) => void
    onReport : (event : string) => void
    selectedCategory ?: number
    selectCategory : (category : number|undefined)=>void
    editContext : ItemEditContext
    setEditContext : (editContext : ItemEditContext) => void
}

export const ItemContext = createContext<ItemContextService>({
    context : {},
    setContext : data => {},
    selectItem : item =>{},
    onReport : event =>{},
    selectCategory : category =>{},
    editContext : noneItemEditContext(item => {}),
    setEditContext : context =>{}
});

export function imageUrl(key : string):string{
    return IMAGE_CLOUDFRONT_URL + key + JPG
}

export function thumbnailUrl(key : string):string{
    return THUMBNAIL_CLOUDFRONT_URL + key + PNG
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