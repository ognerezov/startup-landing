import React, {FC, useEffect, useState} from 'react'
import EmailDialog from "../../dialogs/EmailDialog";
import {Item} from "../../model/items";
import {MapView} from "../maps/MapView";
import {Box, Center, Spinner, Text, useMediaQuery, usePrevious} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {ItemGrid} from "../items/ItemGrid";
import {ItemContext, ItemContextService} from "../../context/context";
import {useIntl} from "react-intl";
import {Point} from "../../model/geo";
import {FetchState, useFetchState} from "../../hooks/fetchState";
import {useGeoLocation} from "../../hooks/location";

interface CategoryViewerProps {
    id : number
    title : string
    onExit : ()=>void
    setItems : (items : Item[]) => void;
}

export const CategoryViewer : FC<CategoryViewerProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const [viewMap, setViewMap] = useState(true)
    const [highLighted,highLight] = useState<number|undefined>(undefined);
    const [location, setLocation] = useGeoLocation(undefined);
    const search = {category: props.id, location}
    const prevSearch = usePrevious(search);
    const [items,itemsFetchState,itemFetchError,submitQuery] = useFetchState<Item [] | undefined,Point>("items/category/" + props.id,'POST',undefined)

    const intl = useIntl()

    useEffect(()=>{
        if(!prevSearch ||( search.category !== prevSearch.category && search.location !== prevSearch.location)){
            submitQuery(location)
        }
        console.log(search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.id,location.lon,location.lat])

    useEffect(()=>{
        items && props.setItems(items)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[items])

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
                overflowX='auto' overflowY='auto'
                width='67vw' maxWidth='67vw'
                borderColor={'blue.300'}
                borderLeftWidth={'1px'}
            >
                <MapView {...data.context} className='map-container-landscape' selectItem={data.selectItem} highLightItem={highLight} point={location}/>
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
                         selectItem={data.selectItem} highLightItem={highLight} point={location}/>
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
    if(itemsFetchState !== FetchState.Finished)
        return  <Center w={'100%'} h={'100%'}>
                    <Spinner/>
                </Center>

    return items ?
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
