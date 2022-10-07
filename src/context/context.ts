import {createContext} from "react";
import {Item} from "../model/items";
import {Dict, ItemDict} from "../model/common";
import {IMAGE_CLOUDFRONT_URL, THUMBNAIL_CLOUDFRONT_URL} from "../config/ServerAddress";
import {Interval} from "../services/date/DateUtils";
import {Category} from "../components/categories/model";
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

export enum PurchasePhase{
    NotStarted,
    Started,
    Confirmed,
    Processing,
    Payed
}

export interface ItemEditContext{
    id ?: number
    category ?: number
    state : EditState
    editItem ?: Item
}

export function noneItemEditContext() :ItemEditContext{
    return {
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
    purchasePhase : PurchasePhase,
    setPurchasePhase : (phase : PurchasePhase)=>void
    rentalPeriod ?: Interval
    setRentalPeriod : (rentalPeriod : Interval) => void
    categories : Category[]
    editItem : (item : Item) => void
}

export const ItemContext = createContext<ItemContextService>({
    context : {},
    setContext : data => {},
    selectItem : item =>{},
    onReport : event =>{},
    selectCategory : category =>{},
    editContext : noneItemEditContext(),
    setEditContext : context =>{},
    purchasePhase : PurchasePhase.NotStarted,
    setPurchasePhase :phase => {},
    setRentalPeriod : rentalPeriod => {},
    categories :[],
    editItem : item => {}
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
