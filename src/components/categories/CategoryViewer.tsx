import React, {FC} from 'react'
import EmailDialog from "../../dialogs/EmailDialog";
import {Item} from "../../model/items";
import {MapView} from "../maps/MapView";
import {Box, useMediaQuery} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {ItemGrid} from "../items/ItemGrid";

interface CategoryViewerProps {
    id : number
    items ?: Item []
    title : string
    onExit : ()=>void
}

export const CategoryViewer : FC<CategoryViewerProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    return props.items && props.items.length >0 ?
        <Box
            width='100vw'
            height='91vh'
            position='fixed' top='9vh'
            left ='0'
        >
            <Box
                display ='block'
                position='fixed'
                left ='0'
                maxHeight = '100%'
                height = '100%'
                overflowX='hidden' overflowY='auto'
                width='34vw' maxWidth='34vw' >
                <ItemGrid columns={2} w='34vw' h='100%'  items={props.items}/>
            </Box>

            <Box
                position='fixed'
                zIndex = {2}
                left ='33vw'
                maxHeight='100%'
                overflowX='hidden' overflowY='auto'
                width='67vw' maxWidth='67vw'
            >
                <MapView items={props.items}/>
            </Box>
        </Box>:
        <EmailDialog
        title={props.title}
        isOpen={true}
        onClose={props.onExit}
        onSuccess={props.onExit}/>
}