import React, {FC} from 'react';
import {ItemsConsumer} from "../../model/common";
import {Grid, GridItem} from "@chakra-ui/react";
import {Item} from "../../model/items";
import {ItemCard} from "./ItemCard";
import {ItemContext} from "../../context/context";

interface ItemGridProps extends ItemsConsumer{
    items ?: Item[]
    columns : number
    w : string
    h : string
}

export const ItemGrid : FC<ItemGridProps> = props => {
    return props.items ?
        <Grid
        w = {props.w}
        h = {props.h}
        maxWidth = {props.w}
        maxHeight = {props.h}
        position='absolute'
        alignItems='start'
        justifyItems='center'
        px='1vw'
        py='1vh'
        overflowX='hidden' overflowY='scroll'
        templateColumns={`repeat(${props.columns}, 1fr)`} gap={1}>
            {props.items.map(item =>
                <GridItem key={item.id} h='20vh'>
                    <ItemContext.Consumer>{ data =>
                        <ItemCard
                        item={item}
                        onSelect={data.selectItem}
                        h={'100%'}
                        w={'100%'}/> }
                    </ItemContext.Consumer>
                </GridItem>)
            }
        </Grid> : null
}