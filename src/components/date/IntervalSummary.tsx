import React, {FC} from 'react'
import {Center, Flex, Spacer, Text, useMediaQuery, VStack} from "@chakra-ui/react";
import {useIntl} from "react-intl";
import {costOf, getDisplayTimeAtDate, Interval} from "../../services/date/DateUtils";
import {Item} from "../../model/items";
import {TextButton} from "../common/TextButton";
import {QUERY_SCREEN_SIZE} from "../../pages/About";

interface IntervalSummaryProps extends Interval{
    clear : ()=>void
    item : Item
    className ?: string
    confirm :()=> void
}

export const IntervalSummary : FC<IntervalSummaryProps> = ({
                   pickupDate,returnDate, pickupSlot,returnSlot,clear,item,className, confirm}) => {
    const intl = useIntl()
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const labelVariant = largeScreen ? 'medium' : 'medium_phone';
    const textVariant = largeScreen ? 'regular' : 'regular_phone';
    return <Flex flexFlow={'column'} p={'1vmin'} h={'100%'}  alignItems={'start'} justifyContent={'space-between'} className={className}>
                <VStack alignItems={'start'} justifyContent={'start'}>
                    <Text variant = {labelVariant}>
                        {intl.formatMessage({id: 'Book.pickup'})}
                    </Text>
                    <Text variant={textVariant}>
                        {pickupDate && pickupSlot ? getDisplayTimeAtDate(pickupDate,pickupSlot) : "-" }
                    </Text>
                    <Text variant ={labelVariant}>
                        {intl.formatMessage({id: 'Book.return'})}
                    </Text>
                    <Text variant={textVariant}>
                        {returnDate && returnSlot ? getDisplayTimeAtDate(returnDate,returnSlot) :"-" }
                    </Text>
                    <Text variant ={labelVariant}>
                        {intl.formatMessage({id: 'Book.total'})}
                    </Text>
                    <Text variant={textVariant}>
                        {returnDate && returnSlot ? (costOf(item,{
                            pickupDate,
                            returnDate,
                            pickupSlot,
                            returnSlot
                        })/100).toFixed(2) + intl.formatMessage({'id' :'Euro'}) :"-" }
                    </Text>
                </VStack>
                <Spacer/>
                <VStack alignItems={'center'} justifyContent={'end'} >
                    <Center w={'100%'} pt={'4vh'}>
                        <TextButton onClick={confirm} id={'Continue'} variant={labelVariant +'_selected'} px ={'2vw'}/>
                    </Center>
                    <Center w={'100%'} pt={'1vh'}>
                        <TextButton onClick={clear} id={'Book.clear.date'} variant={labelVariant} px ={'2vw'}/>
                    </Center>
                </VStack>
    </Flex>
}
