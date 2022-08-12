import React, {FC} from 'react';
import {SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {TextButton} from "../common/TextButton";
import {useIntl} from "react-intl";
import {DateState, HoursState} from "../../services/date/dateState";

export enum SelectionMode{
    Start,
    End,
    Both
}

interface TimeSlotSelectorProps{
    slots : string[]
    selection : HoursState
    w ?: string
    h ?: string
    mode : SelectionMode
    onSelectStart ?: (slot : string) => void
    onSelectEnd ?: (slot : string) => void
}

export const TimeSlotSelector : FC<TimeSlotSelectorProps> =
    ({slots, w, h,onSelectStart,onSelectEnd, mode,selection}) => {

    const intl = useIntl();

    function getTitle(){
        return intl.formatMessage({"id": mode === SelectionMode.Start ||
            (mode === SelectionMode.Both && Object.keys(selection).length ===0)
                ? 'Book.select.pickup' : 'Book.select.return'})
    }

    function onSelect(slot : string){
        switch (mode){
            case SelectionMode.Start:
                onSelectStart!(slot);
                return
            case SelectionMode.End:
                onSelectEnd!(slot);
                return;
            case SelectionMode.Both:
                if(Object.keys(selection).length ===0){
                    onSelectStart!(slot);
                    return;
                }
                onSelectEnd!(slot);
        }
    }
    function getSlotVariant(slot : string){
        const state  = selection[slot]

        return getVariant(state === undefined ? DateState.Free : state)
    }

    function getVariant(state : DateState){
        switch (state) {
            default:
            case DateState.Free:
                return 'medium_solid'
            case DateState.SelectionStart:
            case DateState.SelectionEnd:
                return 'medium_selected'
            case DateState.Past:
                return 'medium_disabled'
            case DateState.Selected:
                return 'medium_semisolid'
        }
    }

    if(slots.length ===0) return null;

    return  <VStack p={'1vmin'} className={'bordered-blue'} w = {w} h = {h}>
                <Text variant={'medium'}>
                    {getTitle()}
                </Text>
                <SimpleGrid
                        alignItems='start'
                        justifyItems='center'
                        spacingY={'0.5vh'}
                        p={'1vmin'}
                        templateColumns={`repeat(8, 1fr)`} gap={1}>
                {slots.map(slot =>
                    <TextButton onClick={()=>{onSelect(slot)}}
                        text={slot} key={slot} variant={getSlotVariant(slot)} mx ={'2vw'} px ={'1vw'}/>)}
            </SimpleGrid>
    </VStack>
}
