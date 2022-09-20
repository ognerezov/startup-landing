import React, {FC, useMemo} from 'react';
import {Box, Flex} from "@chakra-ui/react";
import {Item} from "../../model/items";
import {ItemImage} from "../common/ItemImage";
import {goToItem} from "../../config/ServerAddress";
import {DEFAULT_IMAGE} from "../../context/context";
import {Price} from "../prices/Price";
import {useIntl} from "react-intl";

interface ItemCardProps{
    item : Item
    onSelect : (item : Item)=>void
    w : string
    h : string
    highLighted ?: boolean
}

export const ItemCard : FC<ItemCardProps> = props => {
    const intl = useIntl();
    const price = useMemo(()=>{
        const {pricePerHour, pricePerDay, pricePerWeek, pricePerMonth} = props.item
        let p : number
        let time : string
        if(pricePerHour){
            p = pricePerHour
            time = intl.formatMessage({id: 'Time.hour'})
        } else if (pricePerDay){
            p = pricePerDay
            time = intl.formatMessage({id: 'Time.day'})
        } else if (pricePerWeek){
            p = pricePerWeek
            time = intl.formatMessage({id: 'Time.week'})
        } else {
            p = pricePerMonth
            time = intl.formatMessage({id: 'Time.month'})
        }

        return (
            <Price
                highLighted = {props.highLighted}
                className='small-corners margin-top'
                title={props.item.name}
                time ={time}
                price={p}/>
        )

    },[intl, props.highLighted, props.item])

    return (
        <Box w={props.w} h={props.h}
             position='relative'
             onClick={()=>{
                 goToItem(props.item.id)
             }}
             cursor='pointer'>

            <Flex direction='column'>
                <Box boxShadow='0.2vmin 0.2vmin 1vmin #000 ' className='round-corners'>
                    <ItemImage
                        path={props.item.id + DEFAULT_IMAGE} alt={props.item.name} width='100%'/>
                </Box>
                {price}
            </Flex>
        </Box>
    )
}
