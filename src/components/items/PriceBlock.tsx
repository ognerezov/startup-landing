import React, {FC, useState} from 'react'
import {Box, Button, Text} from "@chakra-ui/react";
import {Item} from "../../model/items";
import {useIntl} from "react-intl";
import EmailDialog from "../../dialogs/EmailDialog";
import {ItemContext, ItemContextService} from "../../context/context";

interface PriceBlockProps{
    item : Item
    className ?: string
    w : string
    h : string
    left : string
    top : string
}

export const PriceBlock : FC<PriceBlockProps> = ({
                                                     item,
                                                     className,
                                                     w,h, left, top}) => {
    const intl = useIntl();
    const [showBookingForm, setShowBookingForm] = useState(false)
    const [success, setSuccess] = useState(false)
    const euro = "€"
    function bookingForm(data : ItemContextService){
       return <EmailDialog
           subject={`Book item request id: ${item.id} name:${item.name} owner: ${item.email}`}
           title={intl.formatMessage({id:'Price.email'})}
           isOpen={showBookingForm}
           onClose={()=>{
               data.onReport(`Booking of ${item.name} is canceled. Item id: ${item.id} `)
               setShowBookingForm(false)
           }}
           onSuccess={()=>{
               data.onReport(`Item ${item.name} was booked. Item id: ${item.id} `)
               setSuccess(true)
           }}/>
    }
    return showBookingForm ? <ItemContext.Consumer>{bookingForm}</ItemContext.Consumer> :
        <Box
        left = {left}
        top = {top}
        position ='fixed'
        w={w}
        h={h}
        px='2vw'
        pt='2vw'
        className = {` ${className}`}
    >
        <Text variant ='title_b'>
            {intl.formatMessage({id: 'Price.hour'})}
        </Text>
        <Text variant='regular'>
            {item.pricePerHour/100 + euro}
        </Text>
        <Text variant ='title_b'>
            {intl.formatMessage({id: 'Price.day'})}
        </Text>
        <Text variant='regular'>
            {item.pricePerDay/100 + euro}
        </Text>
        <Text variant ='title_b'>
            {intl.formatMessage({id: 'Price.week'})}
        </Text>
        <Text variant='regular'>
            {item.pricePerWeek/100 + euro}
        </Text>
        { success ? <Text variant='price_xl'>
                {intl.formatMessage({id: 'Price.booked'})}
            </Text> :
        <Button variant='ghost_selected' w='100%' mt='2vw' onClick={()=>setShowBookingForm(true)}>
            {intl.formatMessage({id: 'Price.book'})}
        </Button> }
    </Box>
}