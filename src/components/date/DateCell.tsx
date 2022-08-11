import React, {FC} from 'react';
import {Center} from "@chakra-ui/react";
import {TextButton} from "../common/TextButton";
import {DateState} from "../../services/date/dateState";

interface DateCellProps{
    dayOfMonth : number
    w ?: string
    h ?: string
    state: DateState
    onClick :()=>void
}

export const DateCell : FC<DateCellProps> = ({dayOfMonth, w, h, state,onClick}) => {

    function getVariant(){
        switch (state) {
            default:
            case DateState.Free:
                return 'medium'
            case DateState.Past:
                return 'medium_disabled'
        }
    }

    function disabled(){
        return state === DateState.Past
    }

    function getBackground(){
        return state === DateState.Selected ? 'green.100'
            : (state === DateState.SelectionEnd || state ===  DateState.SelectionStart ? 'green.300' :undefined)
    }

    return  <Center w={w} h={h} backgroundColor={ getBackground()}>
        {dayOfMonth ?
        <TextButton
            onClick={onClick}
            text={dayOfMonth <10 ? ' ' +dayOfMonth: dayOfMonth+''}
            variant={getVariant()} disabled={disabled()}/>
            : null}
    </Center>
}
