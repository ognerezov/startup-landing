import React, {FC} from 'react';
import {Center, Text, useMediaQuery} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../pages/About";
import {textVar} from "../services/Style";

interface RadioButtonProps{
    id : string
    selected ?: string
    select : (val: string)=>void
    className ?: string
}

const RadioButton : FC<RadioButtonProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)

    function textVariant(){
        return textVar(largeScreen);
    }
    return props.id === props.selected ?
        <Center cursor={'pointer'}>
            <Text variant ={textVariant() +'_ghost'} className={props.className} >
                {props.id}
            </Text>
        </Center> :
        <Center cursor={'pointer'} onClick={()=>{props.select(props.id)}} >
            <Text variant ={textVariant()} onClick={()=>{props.select(props.id)}} className={props.className}>
                {props.id}
            </Text>
        </Center>
}
export default RadioButton;