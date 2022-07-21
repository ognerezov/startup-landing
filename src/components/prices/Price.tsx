import React, {FC} from 'react';
import {Text, VStack} from "@chakra-ui/react";

interface PriceProps{
    className ?: string
    title : string
    price : number
    time ?: string
    highLighted ?: boolean
}

export const Price : FC<PriceProps> = ({className,title,price,highLighted,time}) => {
    return <VStack backgroundColor={highLighted ? 'blue.300':'green.300'} className={className} p='0.5vmin'  h='100%' maxHeight='100%' justifyContent={'space-between'}>
        <Text variant ={highLighted ? 'regular_highlighted' : 'regular'}>
            {title}
        </Text>
        <Text variant='emphasis'>
            {price ? price/100 + '€' + (time ? '/' + time :'') : '--'}
        </Text>
    </VStack>
}