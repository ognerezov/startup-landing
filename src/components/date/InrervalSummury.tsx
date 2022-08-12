import React, {FC} from 'react'
import {Text, VStack} from "@chakra-ui/react";
import {useIntl} from "react-intl";
import {getDisplayTimeAtDate} from "../../services/date/DateUtils";

interface InrervalSummuryProps{
    pickupDate ?: Date
    returnDate ?: Date
    pickupSlot : string
    returnSlot : string
    clear : ()=>void
}

export const InrervalSummury : FC<InrervalSummuryProps> = ({
                   pickupDate,returnDate, pickupSlot,returnSlot,clear}) => {
    const intl = useIntl()
    return <VStack p={'1vmin'} h={'100%'} justifyContent={'start'} alignItems={'start'} className={'bordered-blue-left'}>
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

    </VStack>
}
