import React, {FC} from 'react';
import {Button, Center, Flex, HStack, Spacer, Text} from "@chakra-ui/react";
import RadioButton from "./RadioButton";
import {useIntl} from "react-intl";
import {goHome} from "../config/ServerAddress";
import {ItemContextService} from "../context/context";

interface HeaderProps{
    selected ?: string
    select : (val: string)=>void
    buttons : string[]
    context : ItemContextService
}

const Header : FC<HeaderProps> = props => {
    const intl = useIntl();
    return <Flex
                px = '1vw'
                backgroundColor='white'
                position='fixed'
                left='0' top='0' width='100vw' height = '9vh'
                zIndex={3}>
                <Center onClick={goHome} cursor='pointer'>
                    <Text variant='title_b'>
                        {intl.formatMessage({id: 'Company.name'})}
                    </Text>
                </Center>
                <Spacer/>
        {  props.context.selectedItem ?
            <Center >
                <Button variant = 'ghost' onClick={()=>props.context.selectItem(undefined)}>
                    {intl.formatMessage({id: 'Back'})}
                </Button>
            </Center>:
            <HStack spacing='0.5vw'>
                {props.buttons.map(btn => <RadioButton
                    id={btn}
                    select={props.select}
                    selected={props.selected}
                    key={btn}/>)}
            </HStack>
        }
            </Flex>
}

export default Header;