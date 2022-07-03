import React, {FC} from 'react';
import {ItemsConsumer} from "../../model/common";
import {GridItem, SimpleGrid} from "@chakra-ui/react";
import {Item} from "../../model/items";
import {ItemCard} from "./ItemCard";
import {ItemContext} from "../../context/context";

interface ItemGridProps extends ItemsConsumer{
    items ?: Item[]
    columns : number
    w : string
    highLighted ?: number
}

export const ItemGrid : FC<ItemGridProps> = props => {
    return props.items ?
        <SimpleGrid
        w = {props.w}
        maxWidth = {props.w}
        position='absolute'
        alignItems='start'
        justifyItems='center'
        spacingY={'0.5vh'}
        px='1vw'
        pt='1vh'
        pb={'5vh'}
        templateColumns={`repeat(${props.columns}, 1fr)`} gap={1}>
            {props.items.map(item =>
                <GridItem key={item.id}  m={'1vmin'}>
                    <ItemContext.Consumer>{ data =>
                        <ItemCard
                            highLighted={props.highLighted === item.id}
                            item={item}
                            onSelect={data.selectItem}
                            h={'100%'}
                            w={'100%'}
                        /> }
                    </ItemContext.Consumer>
                </GridItem>)
            }
        </SimpleGrid> : null
}