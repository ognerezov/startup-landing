import React, {FC, useEffect, useState} from 'react';
import {Flex, HStack, useMediaQuery, VStack} from "@chakra-ui/react";
import {MonthGrid} from "./MonthGrid";
import {DateState, HoursState, MonthState} from "../../services/date/dateState";
import {daysInAMonth, getDateTimeSlots, getDateWithDayOfMonth, isSameDay} from "../../services/date/DateUtils";
import {DEFAULT_AVAILABLE_TIME} from "../../model/dateTime/Appointment";
import {SelectionMode, TimeSlotSelector} from "./TimeSlotSelector";
import {IntervalSummary} from "./IntervalSummary";
import {Item} from "../../model/items";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {MediaDependent} from "../common/MediaDependent";

interface IntervalPickerProps{
    item : Item
}

export const IntervalPicker : FC<IntervalPickerProps> = ({item}) => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const [date, setDate] = useState<Date>(new Date());
    const [selectionStart, setSelectionStart] = useState<Date|undefined>();
    const [selectionEnd, setSelectionEnd] = useState<Date|undefined>();
    const [currentMonthState, setCurrentMonthState] = useState<MonthState>({})
    const [nextMonthState, setNextMonthState] = useState<MonthState>({})
    const [timeSlots, setTimeslots] = useState<string[]>([])
    const nextMonth = new Date(date.getFullYear(), date.getMonth()+1,date.getDate());
    const [pickupSlot, setPickupSlot] = useState<string>('');
    const [returnSlot, setReturnSlot] = useState<string>('');
    const [hourlySelection, setHourlySelection] = useState<HoursState>({})
    const [slotMode, setSlotMode] = useState<SelectionMode>(SelectionMode.Start)

    useEffect(()=>{
        if(!selectionStart){
            setCurrentMonthState({})
            setNextMonthState({})
            return
        }
        const cs : MonthState ={}
        const ns : MonthState ={}
        if(!selectionEnd){
            for(let i=1; i<=daysInAMonth(date);i++){
                if(isSameDay(selectionStart,date,i)){
                    cs[i] = DateState.SelectionStart
                    setCurrentMonthState(cs)
                    setNextMonthState(ns)
                    return;
                }
            }
            for(let i=1; i<=daysInAMonth(nextMonth);i++){
                if(isSameDay(selectionStart,nextMonth,i)){
                    ns[i] = DateState.SelectionStart
                    setCurrentMonthState(cs)
                    setNextMonthState(ns)
                    return;
                }
            }
        }

        for(let i=1; i<=daysInAMonth(date); i++){
            const day = getDateWithDayOfMonth(date,i);
            if(day < selectionStart)
                continue;
            if(day > selectionEnd!){
                setCurrentMonthState(cs)
                setNextMonthState(ns)
                return;
            }
            if(isSameDay(selectionStart,date,i)){
                cs[i] = DateState.SelectionStart
            } else
            if(isSameDay(selectionEnd!,date,i)){
                cs[i] = DateState.SelectionEnd
            } else {
                cs[i] = DateState.Selected
            }
        }

        for(let i=1; i<=daysInAMonth(nextMonth); i++){
            const day = getDateWithDayOfMonth(nextMonth,i);
            if(day < selectionStart)
                continue;
            if(day> selectionEnd!){
                setCurrentMonthState(cs)
                setNextMonthState(ns)
                return;
            }
            if(isSameDay(selectionStart,nextMonth,i)){
                ns[i] = DateState.SelectionStart
            } else
            if(isSameDay(selectionEnd!,nextMonth,i)){
                ns[i] = DateState.SelectionEnd
            } else{
                ns[i] = DateState.Selected
            }

        }
        setCurrentMonthState(cs)
        setNextMonthState(ns)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[date])

    useEffect(()=>{
        if(!selectionStart) return
        setTimeslots(getTimeSlots(selectionStart))
        setSlotMode(selectionEnd ? SelectionMode.Start : SelectionMode.Both)
        singleSelection(pickupSlot)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectionStart])

    useEffect(()=>{
        if(!selectionEnd) return;
        setTimeslots(getTimeSlots(selectionEnd));
        setSlotMode(SelectionMode.End);
        if (returnSlot) {
            singleSelection(returnSlot)
        } else {
            setReturnSlot(pickupSlot)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectionEnd])

    useEffect(()=>{
        if(!returnSlot && selectionEnd){
            setReturnSlot(pickupSlot)
        }
        if(slotMode === SelectionMode.Both && returnSlot){
            rangeSelection(pickupSlot,returnSlot);
            return;
        }
        singleSelection(pickupSlot)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pickupSlot])

    useEffect(()=>{
        if(!pickupSlot){
            setPickupSlot(returnSlot)
        }
        if(slotMode === SelectionMode.Both){
            if(pickupSlot === returnSlot){
                setHourlySelection({})
                return;
            }
            rangeSelection(pickupSlot,returnSlot);
            return;
        }
        singleSelection(returnSlot)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[returnSlot])

    function singleSelection(slot : string){
        if(!slot){
            return;
        }
        const hs  :HoursState = {}
        hs[slot] = DateState.SelectionStart
        setHourlySelection(hs)
    }

    function confirm(){
        console.log("confirmed")
    }

    function rangeSelection(start : string, end : string){
        const hs  :HoursState = {}
        hs[start] = DateState.SelectionStart
        hs[end] = DateState.SelectionEnd
        let started : boolean = false;
        for(let i=0; i<timeSlots.length; i++){
            if(timeSlots[i] === start){
                started = true;
                continue;
            }
            if(!started){
                continue;
            }
            if(timeSlots[i] === end){
                break;
            }
            hs[timeSlots[i]] = DateState.Selected
        }
        setHourlySelection(hs)
    }

    function clear(){
        setSelectionStart(undefined)
        setSelectionEnd(undefined)
        setPickupSlot('')
        setReturnSlot('')
        setHourlySelection({})
        setCurrentMonthState({})
        setNextMonthState({})
    }

    function getTimeSlots(date : Date){
        return getDateTimeSlots(date,DEFAULT_AVAILABLE_TIME);
    }

    function select(day : number, month : Date){
        const d = getDateWithDayOfMonth(month, day);

        if(!selectionStart ){
            if(month === date){
                currentMonthState[day] = DateState.SelectionStart
                setCurrentMonthState({...currentMonthState})
            }else {
                nextMonthState[day] = DateState.SelectionStart
                setNextMonthState({...nextMonthState})
            }
            setSelectionStart(d)
            return;
        }

        if(!selectionEnd || selectionStart! < d){
            if(month === date){
                currentMonthState[day] = DateState.SelectionEnd
                for(let i=1; i<day; i++){
                    if(getDateWithDayOfMonth(date,i) <= selectionStart!){
                        continue
                    }
                    currentMonthState[i] = DateState.Selected
                }
                for(let i= day+1; i <= daysInAMonth(date); i++){
                   delete currentMonthState[i]
                }
                setCurrentMonthState({...currentMonthState})
                setNextMonthState({})
            }else {
                for(let i=1; i<= daysInAMonth(date); i++){
                    if(getDateWithDayOfMonth(date,i) <= selectionStart!){
                        continue
                    }
                    currentMonthState[i] = DateState.Selected

                }
                for(let i=1; i<day; i++){
                    if(getDateWithDayOfMonth(nextMonth,i) <= selectionStart!){
                        continue
                    }
                    nextMonthState[i] = DateState.Selected
                }
                for(let i= day+1; i<=daysInAMonth(nextMonth); i++){
                    delete nextMonthState[i]
                }
                nextMonthState[day] = DateState.SelectionEnd
                setCurrentMonthState({...currentMonthState})
                setNextMonthState({...nextMonthState})
            }
            setSelectionEnd(d);
            return;
        }
        setSelectionStart(d)
        if(month === date){
            currentMonthState[day] = DateState.SelectionStart

            for (let i = day + 1; i < daysInAMonth(date); i++) {
                if (getDateWithDayOfMonth(date, i) >= selectionEnd!) {
                    break
                }
                currentMonthState[i] = DateState.Selected
            }

            setCurrentMonthState({...currentMonthState})
        }else {
            nextMonthState[day] = DateState.SelectionStart
            for(let i=day + 1; i<daysInAMonth(nextMonth); i++){
                if(getDateWithDayOfMonth(nextMonth,i) >= selectionEnd!){
                    break
                }
                nextMonthState[i] = DateState.Selected
            }
            setCurrentMonthState({})
            setNextMonthState({...nextMonthState})
        }
    }

    function prev(){
        setDate(new Date(date.getFullYear(), date.getMonth()-1,date.getDate()))
    }

    function next(){
        setDate(new Date(date.getFullYear(), date.getMonth()+1,date.getDate()))
    }

    const desktop  = ()=>{
        return   <HStack w={'100%'} className={'bordered-blue'} p={'2vmin'} justifyContent={'center'} >
                    <MonthGrid select={day => {select(day,date)}} date={date} prev={prev} key ={1} state={currentMonthState}/>
                    <MonthGrid date={nextMonth} next={next} key ={2} select={day => {select(day,nextMonth)}} state={nextMonthState}/>
                    <IntervalSummary
                        confirm={confirm}
                        item={item}
                        pickupSlot={pickupSlot} pickupDate={selectionStart}
                        returnSlot={returnSlot} returnDate={selectionEnd}
                        clear={clear}
                        className={'bordered-blue-left'}
                    />
                </HStack>
    }

    const mobile  = ()=>{
        return   <HStack>
            <Flex w={'100%'} flexFlow={'column'} className={'bordered-blue'} alignItems={'start'} p={'2vmin'} >
                <MonthGrid w={'100%'} select={day => {select(day,date)}} date={date} prev={prev} key ={1} state={currentMonthState}/>
                <MonthGrid w={'100%'}  date={nextMonth} next={next} key ={2} select={day => {select(day,nextMonth)}} state={nextMonthState}/>
            </Flex>
            <IntervalSummary
                confirm={confirm}
                item={item}
                pickupSlot={pickupSlot} pickupDate={selectionStart}
                returnSlot={returnSlot} returnDate={selectionEnd}
                clear={clear}  />
        </HStack>
    }

    return  <VStack w={largeScreen ? '100%' : '98%'} >
                <MediaDependent desktop={desktop()} mobile={mobile()}/>
                <TimeSlotSelector
                    columns={largeScreen ? 8 : 4}
                    w={'100%'}
                    mode={slotMode}
                    slots={timeSlots}
                    selection={hourlySelection}
                    onSelectStart={setPickupSlot }
                    onSelectEnd={setReturnSlot}
                />
            </VStack>
}
