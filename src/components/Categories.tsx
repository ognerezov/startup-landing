import React, {FC, useState} from 'react'
import {Box, Grid, useMediaQuery, VStack, Text, Center} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../pages/About";
import {ButtonCard} from "./ButtonCard";
import {CategoryViewer} from "./CategoryViewer";
import {useIntl} from "react-intl";

interface CategoriesProps {
    categories : string[]
    onReport : (event : string)=>void
}

interface CategoriesState{
    category ?: string
}


export const Categories : FC<CategoriesProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const [state,setState] = useState<CategoriesState>({category : undefined})
    const intl = useIntl()
    function getItems(){
        return props.categories.map(id=>(
            <ButtonCard id={id} key={id}
                        onSelect={category=>{
                            props.onReport('Category selected: '+ state.category)
                            setState({...state,category })}} size={largeScreen ? '15vw' : '90vw'}/>
        ))
    }

    function getContent(){
        if(!state.category){
            return getItems()
        }
        const title = intl.formatMessage({id: 'Email.missing2'})
            // + intl.formatMessage({id: `Category.${state.category}`});
        return <CategoryViewer
                    id = {state.category}
                    title={title}
                    onExit={()=>{setState({...state, category : undefined})}}/>
    }
    return <Box
        height='90vh'
        position='fixed' top='9vh'
        left ={largeScreen ? '6vw' : '1vw'}
    >
        <Center w='100%' h={largeScreen ? '20vh' : '2vh'} >
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