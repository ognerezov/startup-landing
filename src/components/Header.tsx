import React, {FC} from 'react';
import {Center, Flex, HStack, Spacer, Text} from "@chakra-ui/react";
import RadioButton from "./RadioButton";
import {useIntl} from "react-intl";
import {goHome} from "../config/ServerAddress";
import {EditState, ItemContextService} from "../context/context";
import {TextButton} from "./common/TextButton";

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
                <Center onClick={goHome} cursor='pointer' >
                    <Text variant='medium' px = '1.1vmin'>
                        {intl.formatMessage({id: 'Company.name'})}
                    </Text>
                </Center>
                <Spacer/>
        {props.context.selectedCategory && props.context.editContext.state === EditState.NotStarted ? <TextButton
            onClick={()=>{
                props.context.setEditContext({
                 ...props.context.editContext,
                 state : EditState.Started,
                 category : props.context.selectedCategory
                })
            }}
            id={'Category.list.items'}
            px={'1.1vmin'}
            variant = 'medium_solid'/> : null}
        {  props.context.selectedItem || props.context.selectedCategory ?
            <TextButton onClick={()=>{
                if(props.context.editContext.state === EditState.NotStarted){
                    props.context.setEditContext({...props.context.editContext, state : EditState.NotStarted})
                } else {
                    props.context.selectItem(undefined)
                    goHome()
                }
            }} id={'Back'} px={'1.1vmin'} variant = 'medium'/> :
            <HStack spacing='0.5vw'>
                {props.buttons.map(btn => <RadioButton
                    className={'px'}
                    id={btn}
                    select={props.select}
                    selected={props.selected}
                    key={btn}/>)}
            </HStack>
        }
            </Flex>
}

export default Header;