import React, {FC} from 'react';
import {Center, Text} from "@chakra-ui/react";
import {useIntl} from "react-intl";

interface TextButtonProps{
    onClick : ()=>void
    variant ?: string
    px ?: string
    id : string
}

export const TextButton : FC<TextButtonProps> = ({onClick,variant,px, id}) => {
    const intl = useIntl();
    return  <Center onClick={onClick} cursor='pointer' >
        <Text variant = {variant} px = {px} >
            {intl.formatMessage({id})}
        </Text>
    </Center>
}