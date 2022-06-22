import React, {FC} from 'react';
import {Box, Flex} from "@chakra-ui/react";
import {Item} from "../../model/items";
import {ItemImage} from "../common/ItemImage";
import {goToItem} from "../../config/ServerAddress";
import {DEFAULT_IMAGE} from "../../context/context";
import {Price} from "../prices/Price";

interface ItemCardProps{
    item : Item
    onSelect : (item : Item)=>void
    w : string
    h : string
    highLighted ?: boolean
}

export const ItemCard : FC<ItemCardProps> = props => {
    function getCard(){
        return         <Box w={props.w} h={props.h}
                               position='relative'
                               onClick={()=>{
                                   goToItem(props.item.id)
                               }}
                               cursor='pointer'>

            <Flex direction='column'>
                <Box boxShadow='0.2vmin 0.2vmin 1vmin #000 ' className='round-corners'>
                    <ItemImage
                    path={props.item.id + DEFAULT_IMAGE} alt={props.item.name} width='100%'/>
                </Box>
                <Price
                    highLighted = {props.highLighted}
                    className='small-corners margin-top'
                    title={props.item.name}
                    price={(props.item.pricePerDay / 100) + '€/day'}/>
            </Flex>
        </Box>
    }

    return getCard()
}