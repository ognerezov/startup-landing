import React, {FC, useState} from 'react'
import {Button, Center, HStack, Text, VStack} from "@chakra-ui/react";
import {Item} from "../../model/items";
import {useIntl} from "react-intl";
import {ItemContext, ItemContextService} from "../../context/context";
import {Price} from "./Price";
import {DialogFrame} from "../../dialogs/DialogFrame";
import {IntervalPicker} from "../date/IntervalPicker";

interface PriceBlockProps{
    item : Item
    className ?: string
    position ?: "-webkit-sticky" | "absolute" | "fixed" | "relative" | "static" | "sticky"
    w : string
    h : string
    left : string
    top : string
}

export const PriceBlock : FC<PriceBlockProps> = ({
                                                     item,
                                                     className,
                                                     position,
                                                     w,h, left, top}) => {
    const intl = useIntl();
    const [showBookingForm, setShowBookingForm] = useState(false)
    const [success] = useState(false)

    function bookingForm(data : ItemContextService){
        return <DialogFrame
            w={'90vw'} h={'90vh'}
            title={intl.formatMessage({"id": 'Book.select.date'})}
            isOpen={true} onClose={()=>{setShowBookingForm(false)}}>
            <IntervalPicker item={item}/>
        </DialogFrame>
    }
    return showBookingForm ? <ItemContext.Consumer>{bookingForm}</ItemContext.Consumer> :
        <VStack
            left = {left}
            top = {top}
            position ={position}
            w={w}
            h={h}
            ps='2vw'
            backgroundColor='white'
            justifyContent={'center'}
            alignItems={'stretch'}
        >
            <Center
                    top ='0'
                    h={`calc(${h}*0.15)}`}>
                <Text variant='title_b' >
                    {item.name}
                </Text>
            </Center>
            <VStack
                h={`calc(${h}*0.35)}`}
                width='100%'
                py='1vh'
                backgroundColor='white'
                justifyContent='stretch'
                className = {` ${className}`}>
                <HStack w='100%' justifyContent='stretch' alignItems='center' spacing='2%'>
                <Price
                    className='small-corners bordered flex-one-fours'
                    title={intl.formatMessage({id: 'Price.hour'})}
                    price={item.pricePerHour}
                    time={intl.formatMessage({id: 'Time.hour'})}
                />
                <Price
                    className='small-corners bordered flex-one-fours'
                    title={intl.formatMessage({id: 'Price.day'})}
                    price={item.pricePerDay}
                    time={intl.formatMessage({id: 'Time.day'})}
                />
                <Price
                    className='small-corners bordered flex-one-fours'
                    title={intl.formatMessage({id: 'Price.week'})}
                    price={item.pricePerWeek}
                    time={intl.formatMessage({id: 'Time.week'})}
                />
                <Price
                    className='small-corners bordered flex-one-fours'
                    title={intl.formatMessage({id: 'Price.month'})}
                    price={item.pricePerMonth}
                    time={intl.formatMessage({id: 'Time.month'})}
                />
                </HStack>
            </VStack>
            <Center flex={1} w='100%' mt='2vw'>
            { success ? <Text variant='price_xl' w='100%' >
                    {intl.formatMessage({id: 'Price.booked'})}
                </Text> :
                <Button className='bordered' w='100%' variant='ghost'   onClick={()=>setShowBookingForm(true)}>
                    {intl.formatMessage({id: 'Price.book'})}
                </Button> }
            </Center>
        </VStack>
}
