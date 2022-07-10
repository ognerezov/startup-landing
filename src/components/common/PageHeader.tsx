import React, {FC} from 'react'
import {Flex} from "@chakra-ui/react";

interface PageHeaderProps{
    children ?: React.ReactNode;
}

export const PageHeader : FC<PageHeaderProps> = ({children}) =>{
    return <Flex
        px = '1vw'
        backgroundColor='white'
        borderColor={'blue.300'}
        borderBottomWidth={'1px'}
        position='fixed'
        left='0' top='0' width='100vw' height = '6vh'
        zIndex={4}>
        {children}
    </Flex>
}