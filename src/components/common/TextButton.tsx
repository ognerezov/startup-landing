import React, {FC} from 'react';
import {Center, Text} from "@chakra-ui/react";
import {useIntl} from "react-intl";

interface TextButtonProps{
    onClick : ()=>void
    variant ?: string
    px ?: string
    id ?: string
    text ?: string
    mx? : string
    disabled ?: boolean
}

export const TextButton : FC<TextButtonProps> = ({disabled, onClick,variant,px, mx, id, text}) => {
    const intl = useIntl();
    const txt = (id ? intl.formatMessage({id}) : '') + (text ? text : '')

    return  <Center onClick={disabled ? undefined : onClick} cursor={disabled ? 'not-allowed' :'pointer'} mx={mx}>
        <Text variant = {variant} px = {px} whiteSpace={'pre'}>
            {txt}
        </Text>
    </Center>
}
