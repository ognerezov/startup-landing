import React, {FC} from 'react'
import {Item} from "../../model/items";

interface ItemViewProps{
    item : Item
}

export const ItemView : FC<ItemViewProps> = ({item}) => {
    return <div>
        {item.id}
    </div>
}