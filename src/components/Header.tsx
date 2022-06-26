import React, {FC} from 'react';
import {Center, Flex, HStack, Spacer, Text} from "@chakra-ui/react";
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
                borderColor={'blue.300'}
                borderBottomWidth={'1px'}
                position='fixed'
                left='0' top='0' width='100vw' height = '6vh'
                zIndex={3}>
                <Center onClick={goHome} cursor='pointer'>
                    <Text variant='medium'>
                        {intl.formatMessage({id: 'Company.name'})}
                    </Text>
                </Center>
                <Spacer/>
        {  props.context.selectedItem ?
            <Center onClick={()=>{
                props.context.selectItem(undefined)
                goHome()
            }} cursor='pointer' >
                <Text variant = 'medium' >
                    {intl.formatMessage({id: 'Back'})}
                </Text>
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