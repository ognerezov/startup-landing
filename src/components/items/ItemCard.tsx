import React, {FC} from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import {Item} from "../../model/items";

interface ItemCardProps{
    item : Item
    onSelect : (item : Item)=>void
    w : string
    h : string
}

export const ItemCard : FC<ItemCardProps> = props => {
    return  <Box w={props.w} h={props.h}
                           position='relative'
                           boxShadow='0.2vmin 0.2vmin 1vmin #000'
                           onClick={()=>{props.onSelect(props.item)}}
                           className='round-corners'
                           cursor='pointer'>

        <Flex direction='column'>
            <img src={'https://d2g79p4t72w59h.cloudfront.net/' + props.item.id + '/default.jpg'} width='100%%' className='round-corners' alt={props.item.name}/>

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
            {/*</Box>*/}
    </Box>
}