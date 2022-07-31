import React, {FC} from 'react';
import {Center, Text} from "@chakra-ui/react";
import {useIntl} from "react-intl";

interface TextButtonProps{
    onClick : ()=>void
    variant ?: string
    px ?: string
    id : string
    mx? : string
}

export const TextButton : FC<TextButtonProps> = ({onClick,variant,px, mx, id}) => {
    const intl = useIntl();
    return  <Center onClick={onClick} cursor='pointer' mx={mx}>
        <Text variant = {variant} px = {px} >
            {intl.formatMessage({id})}
        </Text>
    </Center>
}