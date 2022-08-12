import React, {FC} from 'react';
import {Center} from "@chakra-ui/react";
import {TextButton} from "../common/TextButton";
import {DateState, isDisabled} from "../../services/date/dateState";

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
            case DateState.SelectionStart:
            case DateState.SelectionEnd:
                return 'medium_solid'
            case DateState.Past:
            case DateState.Taken:
                return 'medium_disabled'
            case DateState.Selected:
                return 'medium_semisolid'
        }
    }

    function disabled(){
        return isDisabled(state)
    }

    function getBackground(){
        return state === DateState.Selected ? 'blue.400'
            : (state === DateState.SelectionEnd || state ===  DateState.SelectionStart ? 'blue.300' :undefined)
    }

    return  <Center w={w} h={h} backgroundColor={ getBackground()} >
        {dayOfMonth ?
        <TextButton
            onClick={onClick}
            text={dayOfMonth <10 ? ' ' +dayOfMonth: dayOfMonth+''}
            variant={getVariant()} disabled={disabled()}/>
            : null}
    </Center>
}
