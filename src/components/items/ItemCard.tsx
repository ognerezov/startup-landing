import React, {FC} from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import {Item} from "../../model/items";
import {ItemImage} from "../common/ItemImage";
import {goToItem} from "../../config/ServerAddress";

interface ItemCardProps{
    item : Item
    onSelect : (item : Item)=>void
    w : string
    h : string
}

export const ItemCard : FC<ItemCardProps> = props => {
    function getCard(){
        return         <Box w={props.w} h={props.h}
                               position='relative'
                               boxShadow='0.2vmin 0.2vmin 1vmin #000'
                               onClick={()=>{
                                   goToItem(props.item.id)
                                   // props.onSelect(props.item)
                               }}
                               className='round-corners'
                               cursor='pointer'>

            <Flex direction='column'>
                <ItemImage path={props.item.id + '/default.jpg'} alt={props.item.name} width='100%'/>
                <Box
                    borderRadius='0 0 2vmin 2vmin' h='50%'
                    py='0.5vh'
                >
                        <Text variant ='bold'>
                        {props.item.name}
                        </Text>
                        <Text variant='price'>
                            {(props.item.pricePerDay / 100) + '€/day' }
                        </Text>
                </Box>
            </Flex>
        </Box>
    }

    return getCard()
}