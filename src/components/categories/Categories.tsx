import React, {FC, useEffect, useState} from 'react'
import {Box, Grid, useMediaQuery, VStack, Text, Center} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {ButtonCard} from "../ButtonCard";
import {CategoryViewer} from "./CategoryViewer";
import {useIntl} from "react-intl";
import {findByCategoryNearBy} from "../../backend/GeoSearch";
import {Item} from "../../model/items";
import {IItemContext} from "../../context/context";

interface CategoriesProps {
    categories : number[]
    onReport : (event : string)=>void
    setItems : (items : Item[]) => void;
    context : IItemContext
    category ?: number
}

interface CategoriesState{
    category ?: number
}

export const Categories : FC<CategoriesProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const [state,setState] = useState<CategoriesState>({category : undefined})
    const intl = useIntl()

    useEffect(()=>{
        if(props.category && state.category !== props.category){
            onChangeCategory(props.category).then(()=>{})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.category])

    async function onChangeCategory(category : number){
        props.onReport('Category selected: '+ state.category);
        const items : Item[] = await findByCategoryNearBy(category);
        setState({...state, category})
        props.setItems(items)
    }

    function getItems(){
        return props.categories.map(id=>(
            <ButtonCard id={id} key={id}
                        onSelect={onChangeCategory} size={largeScreen ? '15vw' : '90vw'}/>
        ))
    }

    function getContent(){
        if(!state.category){
            return getItems()
        }
        const title = intl.formatMessage({id: 'Email.missing2'})
        return  <CategoryViewer
                    items={props.context.itemList}
                    id = {state.category}
                    title={title}
                    onExit={()=>{setState({...state, category : undefined})}}/>
    }
    return <Box
        height='90vh'
        position='fixed' top='9vh'
        left ={largeScreen ? '6vw' : '1vw'}
    >
        <Center w='100%' h={'20vh'} display={largeScreen ? undefined : 'none'}>
            <Text variant='title_b'>
                {intl.formatMessage({id: 'Company.slogan'})}
            </Text>
        </Center>
        {largeScreen ?
        <Grid
            alignItems='center'
            justifyItems='center'
            px='1vw'
            pb='25vh'
            templateColumns='repeat(5, 1fr)' gap={6} width='88vw' h='100%'>
        {getContent()}
    </Grid> : <VStack
                w = '98vw'
                px='4w'
                pt ='3vh'
                pb='6vh'
                overflowX='hidden' overflowY='scroll' maxHeight='90vh'
                h='100%'
            >
        {getContent()}
    </VStack>}
    </Box>
}