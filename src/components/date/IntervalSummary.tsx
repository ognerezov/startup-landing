import React, {FC} from 'react'
import {Center, Spacer, Text, VStack} from "@chakra-ui/react";
import {useIntl} from "react-intl";
import {costOf, getDisplayTimeAtDate, Interval} from "../../services/date/DateUtils";
import {Item} from "../../model/items";
import {TextButton} from "../common/TextButton";

interface IntervalSummaryProps extends Interval{
    clear : ()=>void
    item : Item
    className ?: string
}

export const IntervalSummary : FC<IntervalSummaryProps> = ({
                   pickupDate,returnDate, pickupSlot,returnSlot,clear,item,className}) => {
    const intl = useIntl()
    return <VStack p={'1vmin'} h={'100%'}  alignItems={'start'} className={className}>
                <Text variant ='medium'>
                    {intl.formatMessage({id: 'Book.pickup'})}
                </Text>
                <Text variant='regular'>
                    {pickupDate && pickupSlot ? getDisplayTimeAtDate(pickupDate,pickupSlot) :"" }
                </Text>
                <Text variant ='medium'>
                    {intl.formatMessage({id: 'Book.return'})}
                </Text>
                <Text variant='regular'>
                    {returnDate && returnSlot ? getDisplayTimeAtDate(returnDate,returnSlot) :"" }
                </Text>
                <Text variant ='medium'>
                    {intl.formatMessage({id: 'Book.total'})}
                </Text>
                <Text variant='regular'>
                    {returnDate && returnSlot ? (costOf(item,{
                        pickupDate,
                        returnDate,
                        pickupSlot,
                        returnSlot
                    })/100).toFixed(2) + intl.formatMessage({'id' :'Euro'}) :"" }
                </Text>
                <Center w={'100%'} pt={'4vh'}>
                    <TextButton onClick={()=>{}} id={'Continue'} variant={'medium_selected'} px ={'2vw'}/>
                </Center>
                <Spacer/>
                <Center w={'100%'} pt={'1vh'}>
                    <TextButton onClick={clear} id={'Book.clear.date'} variant={'medium'} px ={'2vw'}/>
                </Center>
    </VStack>
}
