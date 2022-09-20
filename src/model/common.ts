import {Item} from "./items";

export interface Dict {
    [key: string] : string
}

export interface ItemDict {
    [key : string] : Item
}

export interface ItemsConsumer {
    items ?: Item[]
}
