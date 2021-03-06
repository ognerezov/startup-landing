import React, {FC, useState} from 'react'
import EmailDialog from "../../dialogs/EmailDialog";
import {Item} from "../../model/items";
import {MapView} from "../maps/MapView";
import {Box, Center, Text, useMediaQuery} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {ItemGrid} from "../items/ItemGrid";
import {ItemContext, ItemContextService} from "../../context/context";
import {useIntl} from "react-intl";
import {Point} from "../../model/geo";

interface CategoryViewerProps {
    id : number
    items ?: Item []
    title : string
    onExit : ()=>void
    at : Point
}

export const CategoryViewer : FC<CategoryViewerProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const [viewMap, setViewMap] = useState(true)
    const  [highLighted,highLight] = useState<number|undefined>(undefined);
    const intl = useIntl()

    function getFullScreenContent(data : ItemContextService){
        return  <Box
            width='100vw'
            height='94vh'
            position='fixed' top='6vh'
            left='0'
            borderColor={'blue.300'}
            borderBottomWidth={'1px'}
        >
            <Box
                display='block'
                position='fixed'
                left='0'
                maxHeight='100%'
                height='100%'
                overflowX='hidden' overflowY='auto'
                width='34vw' maxWidth='34vw'>
                <ItemGrid columns={2} w='34vw' items={data.context.itemList} highLighted={highLighted}/>
            </Box>

            <Box
                position='fixed'
                zIndex={2}
                left='33vw'
                maxHeight='100%'
                overflowX='hidden' overflowY='auto'
                width='67vw' maxWidth='67vw'
                borderColor={'blue.300'}
                borderLeftWidth={'1px'}
            >
                <MapView {...data.context} className='map-container-landscape' selectItem={data.selectItem} highLightItem={highLight} point={props.at}/>
            </Box>
        </Box>
    }

    function getMobileContent(data : ItemContextService){
        return viewMap ? <Box
            width='100vw'
            height='94vh'
            position='fixed' top='6vh'
            left='0'
        >
                <MapView {...data.context} className='map-container-portrait '
                         selectItem={data.selectItem} highLightItem={highLight} point={props.at}/>
                <Center position='fixed' top='94vh' zIndex={10} w='100%'>
                    <Text variant='small' onClick={()=>setViewMap(false)}>
                        {intl.formatMessage({id: 'Category.view.list'})}
                    </Text>
                </Center>
        </Box> :
            <Box
                width='100vw'
                height='94vh'
                position='fixed' top='6vh'
                left='0'
                overflowX='hidden' overflowY='scroll'
            >
                <ItemGrid columns={2} w='100vw' items={data.context.itemList} highLighted={highLighted}/>
                <Center position='fixed' top='94vh' zIndex={10} w='100%'>
                    <Text variant='small' onClick={()=>setViewMap(true)}>
                        {intl.formatMessage({id: 'Category.view.map'})}
                    </Text>
                </Center>
            </Box>

    }

    return props.items ?
        <ItemContext.Consumer>{largeScreen? getFullScreenContent : getMobileContent}
        </ItemContext.Consumer>
            :
        <EmailDialog
        subject={'from empty category '+ props.id}
        title={props.title}
        isOpen={true}
        onClose={props.onExit}
        onSuccess={props.onExit}/>
}