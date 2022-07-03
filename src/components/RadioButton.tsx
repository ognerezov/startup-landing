import React, {FC} from 'react';
import {Center, Text} from "@chakra-ui/react";

interface RadioButtonProps{
    id : string
    selected ?: string
    select : (val: string)=>void
    className ?: string
}

const RadioButton : FC<RadioButtonProps> = props => {
    return props.id === props.selected ?
        <Center cursor={'pointer'}>
            <Text variant ={'medium_ghost'} className={props.className} >
                {props.id}
            </Text>
        </Center> :
        <Center cursor={'pointer'} onClick={()=>{props.select(props.id)}} >
            <Text variant ={'medium'} onClick={()=>{props.select(props.id)}} className={props.className}>
                {props.id}
            </Text>
        </Center>
}
export default RadioButton;