import React, {FC, useEffect, useMemo, useState} from 'react'
import {Item} from "../../model/items";
import {MapView} from "../maps/MapView";
import {AbsoluteCenter, Box, Center, Spinner, Text, useMediaQuery} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {ItemGrid} from "../items/ItemGrid";
import {ItemContext, ItemContextService} from "../../context/context";
import {useIntl} from "react-intl";
import { Spot} from "../../model/geo";
import {FetchState, useFetchState} from "../../hooks/fetchState";
import {useGeoLocation} from "../../hooks/location";
import {getLocation} from "../../services/GeolocationService";

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
    const [location] = useGeoLocation(undefined);
    const [items,itemsFetchState,,submitQuery] = useFetchState<Item [] | undefined,Spot>("items/category/" + props.id,'POST',undefined)

    const intl = useIntl()

    useEffect(()=>{
        getLocation().then(point =>{
            submitQuery({...point,radius:30000})
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.id])

    useEffect(()=>{
        if (items) {
            props.setItems(items)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[items])

    const content = useMemo(()=>{
        return largeScreen ?
            function getFullScreenContent(data : ItemContextService){
                // console.log(data.context.items)
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
            } :

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

    },[largeScreen, highLighted, location, viewMap, intl])

    if(itemsFetchState !== FetchState.Finished)
        return  <AbsoluteCenter>
                    <Spinner/>
                </AbsoluteCenter>

    return items ?
        <ItemContext.Consumer>{content}
        </ItemContext.Consumer>
            :
        <Center w={'100wh'} h={'50vh'}>
            <Spinner/>
        </Center>
        // <EmailDialog
        // subject={'from empty category '+ props.id}
        // title={props.title}
        // isOpen={true}
        // onClose={props.onExit}
        // onSuccess={props.onExit}/>
}
