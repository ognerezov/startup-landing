import React, {FC} from 'react';
import {Center, useMediaQuery} from "@chakra-ui/react";
import {TextButton} from "../common/TextButton";
import {DateState, isDisabled} from "../../services/date/dateState";
import {QUERY_SCREEN_SIZE} from "../../pages/About";

interface DateCellProps{
    dayOfMonth : number
    w ?: string
    h ?: string
    state: DateState
    onClick :()=>void
}

export const DateCell : FC<DateCellProps> = ({dayOfMonth, w, h, state,onClick}) => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    function getVariant(){
        const base = largeScreen ? 'medium' : 'medium_phone'
        switch (state) {
            default:
            case DateState.Free:
                return base
            case DateState.SelectionStart:
            case DateState.SelectionEnd:
                return base + '_solid'
            case DateState.Past:
            case DateState.Taken:
                return base +'_disabled'
            case DateState.Selected:
                return base + '_semisolid'
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
