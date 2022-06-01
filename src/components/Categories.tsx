import React, {FC, useState} from 'react'
import {Grid, useMediaQuery, VStack} from "@chakra-ui/react";
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
        console.log(state.category)
        if(!state.category){
            return getItems()
        }
        const title = intl.formatMessage({id: 'Email.missing1'}) +
            intl.formatMessage({id: `Category.${state.category}`});
        return <CategoryViewer
                    id = {state.category}
                    title={title}
                    onExit={()=>{setState({...state, category : undefined})}}/>
    }
    return largeScreen ? <Grid
            alignItems='center'
            position='fixed' top='9vh' left ='6vw'
            px='1vw'
            py='20vh'
            templateColumns='repeat(5, 1fr)' gap={6} width='88vw' height='90vh'>
        {getContent()}
    </Grid> : <VStack
                position='fixed' top='9vh' left ='1vw'
                w = '98vw'
                px='4w'
                py='5vh'
                overflowX='hidden' overflowY='scroll' maxHeight='90vh'
            >
        {getContent()}
    </VStack>
}