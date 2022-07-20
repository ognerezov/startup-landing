import React, {FC, useEffect, useState} from 'react'
import {Box, Grid, useMediaQuery, VStack, Text, Center, Spinner} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {ButtonCard} from "../ButtonCard";
import {CategoryViewer} from "./CategoryViewer";
import {useIntl} from "react-intl";
import {DEFAULT_R, DEFAULT_SPOT, findByCategoryNearBy} from "../../backend/GeoSearch";
import {Item} from "../../model/items";
import {ItemContextService} from "../../context/context";
import {getLocation} from "../../services/GeolocationService";
import {Point, Spot} from "../../model/geo";
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
    const [fetching, setFetching] = useState(false)
    const [location, setLocation] = useState<Point>(DEFAULT_SPOT)
    const intl = useIntl()

    useEffect(()=>{
        if(props.context.selectedCategory&& props.context.selectedCategory !== props.previousCategory){
            onChangeCategory(props.context.selectedCategory).then(()=>{})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.previousCategory, props.context.selectedCategory])

    async function fetchItems(category: number, spot : Spot = DEFAULT_SPOT) {
        const items: Item[] = await findByCategoryNearBy(category, spot);
        setFetching(false);
        props.context.selectCategory(category)
        props.setItems(items)
    }

    async function onChangeCategory(category : number){
        props.onReport('Category selected: '+ category);
        setFetching(true);
        getLocation().then(async point =>{
              setLocation(point)
              await  fetchItems(category, {...point, radius : DEFAULT_R})

            })
            .catch(async e=>{
                await fetchItems(category);
            })
    }

    function getItems(){
        return props.categories.map(id=>(
            <ButtonCard id={id} key={id}
                        onSelect={onChangeCategory} size={largeScreen ? '15vw' : '90vw'}/>
        ))
    }

    function getContent(){
        if(fetching){
            return null
        }
        if(!props.context.selectedCategory){
            return getItems()
        }
        const title = intl.formatMessage({id: 'Email.missing2'})
        return  <CategoryViewer
                    at = {location}
                    items={props.context.context.itemList}
                    id = {props.context.selectedCategory}
                    title={title}
                    onExit={()=>{props.context.selectCategory(undefined)}}/>
    }
    return <Box
        height='97vh'
        position='fixed'
        top='3vh'
        overflowY={'auto'}
        overflowX={'hidden'}
        width={'100vw'}
    >
            <VStack  maxHeight= {'290vh'}   left ={largeScreen ? '6vw' : '1vw'}>
                {props.context.selectedCategory ? null :
                    <div>
                        <img src={mainImage} className='basic-margin' width={largeScreen ? '50%' : '90%'}
                             alt={intl.formatMessage({id: 'Company.slogan'})}/>
                        <Center w={'100%'} >
                        <Text variant={'medium'} px = {'2vw'}>
                    {intl.formatMessage({id: 'App.hello'})}
                        </Text>
                        </Center>
                    </div>
                }
                {fetching ?
                    <Center w={'100%'} h={'100%'}>
                        <Spinner/>
                    </Center> :
                        largeScreen ?
                            <Grid
                                background={props.context.selectedCategory ? 'white' : 'blue.300'}
                                alignItems='center'
                                justifyItems='center'
                                px='7vw'
                                pt={'2vh'}
                                pb={'5vh'}
                                templateColumns='repeat(5, 1fr)' gap={6} width='100%' h='100%'>
                                {getContent()}
                            </Grid> : <VStack
                                background={props.context.selectedCategory ? 'white' : 'blue.300'}
                                w='100%'
                                px='5w'
                                pt='3vh'
                                pb='6vh'
                                h='100%'
                            >
                                {getContent()}
                            </VStack>

                }
                {props.context.selectedCategory ? null :
                    <div>
                        <Center w={'100%'}>
                            <Text variant={'medium'} px={'2vw'}>
                                {intl.formatMessage({id: 'App.hello.business'})}
                            </Text>
                        </Center>
                        <img src={earn} className='basic-margin' width={largeScreen ? '50%' : '90%'}
                             alt={intl.formatMessage({id: 'Company.slogan'})}/>
                    </div>
                }
            </VStack>
    </Box>
}