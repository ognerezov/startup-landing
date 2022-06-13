import {Box, Flex, Text, useMediaQuery} from '@chakra-ui/react';
import React, {FC} from 'react'
import {Item} from "../../model/items";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {useIntl} from "react-intl";
import {MapView} from "../maps/MapView";
import {expandItems} from "../../context/context";
import {PriceBlock} from "./PriceBlock";
import {ItemImage} from "../common/ItemImage";

interface ItemViewProps{
    item : Item
}

export const ItemView : FC<ItemViewProps> = ({item}) => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const intl = useIntl()
    return <Box
        height='90vh'
        position='fixed' top='9vh'
        left ={largeScreen ? '25vw' : '1vw'}
        width={largeScreen ? '50vw' : '98vw'}
    >
        <Flex direction='column' height = '100%' maxHeight = '90vh' overflowX='hidden' overflowY='auto'>
            <PriceBlock item={item} left='50vw' w={largeScreen ? '25vw' : '49vw'} top = '9vh' h='25vw'/>
            <ItemImage path={item.id + '/default.jpg'} alt={item.name} width='50%'/>
              <Box
                borderRadius='0 0 2vmin 2vmin' h='50%'
                py='0.5vh'
            >
                <Text variant ='title_b'>
                    {intl.formatMessage({id: 'Description'})}
                </Text>
                <Text variant='regular'>
                    {item.description }
                </Text>
                <Text variant ='title_b'>
                    {intl.formatMessage({id: 'Location'})}
                </Text>
                <MapView
                    className='map-container-mini'
                    {... expandItems([item])}
                />
            </Box>
        </Flex>
    </Box>
}