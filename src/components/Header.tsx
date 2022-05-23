import React, {FC} from 'react';
import {Center, Flex, HStack, Spacer, Text} from "@chakra-ui/react";
import RadioButton from "./RadioButton";

interface HeaderProps{
    selected ?: string
    select : (val: string)=>void
    buttons : string[]
}

const Header : FC<HeaderProps> = props => {
    return <Flex
                px = '1vw'
                backgroundColor='#011135'
                position='fixed'
                left='0' top='0' width='100vw' height = '9vh'
                zIndex={3}>
                <Center >
                    <Text className='gradient-text' variant='caption'>
                        Team Heart
                    </Text>
                </Center>
                <Spacer/>
                <HStack spacing = '0.5vw'>
                    {props.buttons.map(btn=><RadioButton
                        id={btn}
                        select={props.select}
                        selected={props.selected}
                        key={btn}/>)}
                </HStack>
            </Flex>
}

export default Header;