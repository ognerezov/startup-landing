import {createContext} from "react";
import {Item} from "../model/items";
import {Dict, ItemDict} from "../model/common";


export interface IItemContext{
    itemList ?: Item[]
    items ?: ItemDict
    images ?: Dict
}

export interface ItemContextService {
    context : IItemContext,
    setContext : (data : IItemContext) => void;
    selectedItem ?: number
    selectItem : (item : Item) => void
}

export const ItemContext = createContext<ItemContextService>({
    context : {},
    setContext : data => {},
    selectItem : item =>{}
});

export function expandItems(itemList : Item[]) : IItemContext{
    const images : Dict ={};
    const items : ItemDict = {};
    for(let item of itemList){
        images[item.id + ''] = 'https://d2qk3mwcnqg7zi.cloudfront.net/' + item.id + '/default.jpg'
        items[item.id + ''] = item
    }
    return {
        itemList,
        images,
        items
    }
}