import {Box, Flex, Text, useMediaQuery} from '@chakra-ui/react';
import React, {FC} from 'react'
import {Item} from "../../model/items";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {useIntl} from "react-intl";
import {MapView} from "../maps/MapView";
import {DEFAULT_IMAGE, expandItems} from "../../context/context";
import {PriceBlock} from "../prices/PriceBlock";
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
            <ItemImage path={item.id + DEFAULT_IMAGE} alt={item.name} width={largeScreen ? '50%' : '100%'}/>
            <PriceBlock item={item}
                        left='50vw'
                        w={largeScreen ? '25vw' : '100%'}
                        top = '9vh'
                        position={largeScreen ? "fixed" : undefined}
                        h={largeScreen ? '25vw' : '100%'}
                        className='round-corners'/>
            <Box
                h={largeScreen ? '50%' : '70%'}
                py={largeScreen ? '0.5vh':'2vh'}
            >
                <Text variant ='title_b'>
                    {intl.formatMessage({id: 'Description'})}
                </Text>
                <Text variant='regular'>
                    {item.description }
                </Text>
                  <Text variant ='title_b'>
                      {intl.formatMessage({id: 'Item.owner.name'})}
                  </Text>
                  <Text variant='regular'>
                      {item.firstName }
                  </Text>
                  <Text variant ='title_b'>
                      {intl.formatMessage({id: 'Location'})}
                  </Text>
                <MapView
                    className={largeScreen ? 'map-container-mini' : 'map-container-mini-portrait'}
                    {... expandItems([item])}
                />
            </Box>
        </Flex>
    </Box>
}