import React, {FC, Fragment} from 'react'
import {Box, Grid, useMediaQuery, VStack, Text, Center} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {ButtonCard} from "../ButtonCard";
import {CategoryViewer} from "./CategoryViewer";
import {useIntl} from "react-intl";
import {Item} from "../../model/items";
import {ItemContextService} from "../../context/context";
import mainImage from "../../images/main.jpg";
import earn from "../../images/earn.jpeg";


interface CategoriesProps {
    categories : number[]
    onReport : (event : string)=>void
    setItems : (items : Item[]) => void;
    context : ItemContextService
    previousCategory ?: number
}

export const Categories : FC<CategoriesProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const intl = useIntl()


    async function onChangeCategory(category : number){
        props.onReport('Category selected: '+ category);
        props.context.selectCategory(category)
    }

    function getItems(){
        return props.categories.map(id=>(
            <ButtonCard id={id} key={id}
                        onSelect={onChangeCategory} size={largeScreen ? '15vw' : '90vw'}/>
        ))
    }

    function getContent(){
        if(!props.context.selectedCategory){
            return getItems()
        }
        const title = intl.formatMessage({id: 'Email.missing2'})
        return  <CategoryViewer
                    setItems={props.setItems}
                    id = {props.context.selectedCategory}
                    title={title}
                    onExit={()=>{props.context.selectCategory(undefined)}}/>
    }
    return <Box
        height={largeScreen ? '97vh' : '95vh'}
        position='fixed'
        top='3vh'
        overflowY={'auto'}
        overflowX={'hidden'}
        width={'100vw'}
    >
            <VStack  maxHeight= {'290vh'}   left ={largeScreen ? '6vw' : '1vw'}>
                {props.context.selectedCategory ? null :
                    <Fragment>
                        <img src={mainImage} className='basic-margin' width={largeScreen ? '50%' : '90%'}
                             alt={intl.formatMessage({id: 'Company.slogan'})}/>
                        <Center w={'100%'} >
                        <Text variant={'medium'} px = {'2vw'}>
                    {intl.formatMessage({id: 'App.hello'})}
                        </Text>
                        </Center>
                    </Fragment>
                }
                {
                        largeScreen ?
                            <Grid
                                background={props.context.selectedCategory ? 'white' : 'blue.300'}
                                alignItems='center'
                                justifyItems='center'
                                px='7vw'
                                pt={'2vh'}
                                pb={'5vh'}
                                templateColumns='repeat(5, 1fr)' gap={6} width='100%' >
                                {getContent()}
                            </Grid> : <VStack
                                background={props.context.selectedCategory ? 'white' : 'blue.300'}
                                w='100%'
                                px='5w'
                                pt='3vh'
                                pb='6vh'
                            >
                                {getContent()}
                            </VStack>

                }
                {props.context.selectedCategory ? null :
                    <Box pb={largeScreen ? '0.1vh' : '10vh'}>
                        <Center w={'100%'}>
                            <Text variant={'medium'} px={'2vw'}>
                                {intl.formatMessage({id: 'App.hello.business'})}
                            </Text>
                        </Center>
                        <img src={earn} className='basic-margin' width={largeScreen ? '50%' : '90%'}
                             alt={intl.formatMessage({id: 'Company.slogan'})}/>
                    </Box>
                }
            </VStack>
    </Box>
}
