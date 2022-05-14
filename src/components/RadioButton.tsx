import React, {FC} from 'react';
import {Button, Center} from "@chakra-ui/react";

interface RadioButtonProps{
    id : string
    selected ?: string
    select : (val: string)=>void
}

const RadioButton : FC<RadioButtonProps> = props => {
    return props.id === props.selected ?
        <Center >
            <Button variant ='ghost_selected'>
                {props.id}
            </Button>
        </Center> :
        <Center >
            <Button variant ='ghost' onClick={()=>{props.select(props.id)}}>
                {props.id}
            </Button>
        </Center>
}
export default RadioButton;