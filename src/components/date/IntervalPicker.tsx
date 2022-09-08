import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
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
import {ItemContext, PurchasePhase} from "../../context/context";

interface IntervalPickerProps{
    item : Item
}

export const IntervalPicker : FC<IntervalPickerProps> = ({item}) => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const [date, setDate] = useState<Date>(new Date());
    const [pickupDate, setPickupDate] = useState<Date|undefined>();
    const [returnDate, setReturnDate] = useState<Date|undefined>();
    const [currentMonthState, setCurrentMonthState] = useState<MonthState>({})
    const [nextMonthState, setNextMonthState] = useState<MonthState>({})
    const [timeSlots, setTimeslots] = useState<string[]>([])
    const nextMonth = useMemo(()=> new Date(date.getFullYear(), date.getMonth()+1,date.getDate())
        ,[date]);
    const [pickupSlot, setPickupSlot] = useState<string>('');
    const [returnSlot, setReturnSlot] = useState<string>('');
    const [hourlySelection, setHourlySelection] = useState<HoursState>({})
    const [slotMode, setSlotMode] = useState<SelectionMode>(SelectionMode.Start)

    useEffect(()=>{
        if(!pickupDate){
            setCurrentMonthState({})
            setNextMonthState({})
            return
        }
        const cs : MonthState ={}
        const ns : MonthState ={}
        if(!returnDate){
            for(let i=1; i<=daysInAMonth(date);i++){
                if(isSameDay(pickupDate,date,i)){
                    cs[i] = DateState.SelectionStart
                    setCurrentMonthState(cs)
                    setNextMonthState(ns)
                    return;
                }
            }
            for(let i=1; i<=daysInAMonth(nextMonth);i++){
                if(isSameDay(pickupDate,nextMonth,i)){
                    ns[i] = DateState.SelectionStart
                    setCurrentMonthState(cs)
                    setNextMonthState(ns)
                    return;
                }
            }
        }

        for(let i=1; i<=daysInAMonth(date); i++){
            const day = getDateWithDayOfMonth(date,i);
            if(day < pickupDate)
                continue;
            if(day > returnDate!){
                setCurrentMonthState(cs)
                setNextMonthState(ns)
                return;
            }
            if(isSameDay(pickupDate,date,i)){
                cs[i] = DateState.SelectionStart
            } else
            if(isSameDay(returnDate!,date,i)){
                cs[i] = DateState.SelectionEnd
            } else {
                cs[i] = DateState.Selected
            }
        }

        for(let i=1; i<=daysInAMonth(nextMonth); i++){
            const day = getDateWithDayOfMonth(nextMonth,i);
            if(day < pickupDate)
                continue;
            if(day> returnDate!){
                setCurrentMonthState(cs)
                setNextMonthState(ns)
                return;
            }
            if(isSameDay(pickupDate,nextMonth,i)){
                ns[i] = DateState.SelectionStart
            } else
            if(isSameDay(returnDate!,nextMonth,i)){
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
        if(!pickupDate) return
        setTimeslots(getTimeSlots(pickupDate))
        setSlotMode(returnDate ? SelectionMode.Start : SelectionMode.Both)
        singleSelection(pickupSlot)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pickupDate])

    useEffect(()=>{
        if(!returnDate) return;
        setTimeslots(getTimeSlots(returnDate));
        setSlotMode(SelectionMode.End);
        if (returnSlot) {
            singleSelection(returnSlot)
        } else {
            setReturnSlot(pickupSlot)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[returnDate])

    useEffect(()=>{
        if(!returnSlot && returnDate){
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
        setPickupDate(undefined)
        setReturnDate(undefined)
        setPickupSlot('')
        setReturnSlot('')
        setHourlySelection({})
        setCurrentMonthState({})
        setNextMonthState({})
    }

    function getTimeSlots(date : Date){
        return getDateTimeSlots(date,DEFAULT_AVAILABLE_TIME);
    }

    const select = useCallback((day : number, month : Date)=>{
        const d = getDateWithDayOfMonth(month, day);

        if(!pickupDate ){
            if(month === date){
                currentMonthState[day] = DateState.SelectionStart
                setCurrentMonthState({...currentMonthState})
            }else {
                nextMonthState[day] = DateState.SelectionStart
                setNextMonthState({...nextMonthState})
            }
            setPickupDate(d)
            return;
        }

        if(!returnDate || pickupDate! < d){
            if(month === date){
                currentMonthState[day] = DateState.SelectionEnd
                for(let i=1; i<day; i++){
                    if(getDateWithDayOfMonth(date,i) <= pickupDate!){
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
                    if(getDateWithDayOfMonth(date,i) <= pickupDate!){
                        continue
                    }
                    currentMonthState[i] = DateState.Selected

                }
                for(let i=1; i<day; i++){
                    if(getDateWithDayOfMonth(nextMonth,i) <= pickupDate!){
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
            setReturnDate(d);
            return;
        }
        setPickupDate(d)
        if(month === date){
            currentMonthState[day] = DateState.SelectionStart

            for (let i = day + 1; i < daysInAMonth(date); i++) {
                if (getDateWithDayOfMonth(date, i) >= returnDate!) {
                    break
                }
                currentMonthState[i] = DateState.Selected
            }

            setCurrentMonthState({...currentMonthState})
        }else {
            nextMonthState[day] = DateState.SelectionStart
            for(let i=day + 1; i<daysInAMonth(nextMonth); i++){
                if(getDateWithDayOfMonth(nextMonth,i) >= returnDate!){
                    break
                }
                nextMonthState[i] = DateState.Selected
            }
            setCurrentMonthState({})
            setNextMonthState({...nextMonthState})
        }
    },[currentMonthState, date, nextMonth, nextMonthState, returnDate, pickupDate])

    const prev = useCallback(()=>{
        setDate(new Date(date.getFullYear(), date.getMonth()-1,date.getDate()))
    },[date])

    const next = useCallback(()=>{
        setDate(new Date(date.getFullYear(), date.getMonth()+1,date.getDate()))
    },[date])

    const desktop  = useMemo( ()=>{
        return   <HStack w={'100%'} className={'bordered-blue'} p={'2vmin'} justifyContent={'center'} >
                    <MonthGrid select={day => {select(day,date)}} date={date} prev={prev} key ={1} state={currentMonthState}/>
                    <MonthGrid date={nextMonth} next={next} key ={2} select={day => {select(day,nextMonth)}} state={nextMonthState}/>
                    <ItemContext.Consumer>{ context =>(
                        <IntervalSummary
                                    confirm={()=>{
                                        context.setPurchasePhase(PurchasePhase.Started)
                                        context.setRentalPeriod({
                                                pickupDate : pickupDate!,
                                                pickupSlot,
                                                returnDate : returnDate!,
                                                returnSlot
                                        })
                                    }}
                                    item={item}
                                    pickupSlot={pickupSlot} pickupDate={pickupDate}
                                    returnSlot={returnSlot} returnDate={returnDate}
                                    clear={clear}
                                    className={'bordered-blue-left'}
                        /> )}
                    </ItemContext.Consumer>
                </HStack>
    },[currentMonthState, date, item, next, nextMonth, nextMonthState, pickupSlot, prev, returnSlot, select, returnDate, pickupDate])

    const mobile  = useMemo( ()=>{
        return   <HStack>
            <Flex w={'100%'} flexFlow={'column'} className={'bordered-blue'} alignItems={'start'} p={'2vmin'} >
                <MonthGrid w={'100%'} select={day => {select(day,date)}} date={date} prev={prev} key ={1} state={currentMonthState}/>
                <MonthGrid w={'100%'}  date={nextMonth} next={next} key ={2} select={day => {select(day,nextMonth)}} state={nextMonthState}/>
            </Flex>
            <ItemContext.Consumer>{ context =>(
                <IntervalSummary
                    confirm={()=>{
                        context.setPurchasePhase(PurchasePhase.Started)
                        context.setRentalPeriod({
                            pickupDate : pickupDate!,
                            pickupSlot,
                            returnDate : returnDate!,
                            returnSlot
                        })
                    }}
                    item={item}
                    pickupSlot={pickupSlot} pickupDate={pickupDate}
                    returnSlot={returnSlot} returnDate={returnDate}
                    clear={clear}  />)}
            </ItemContext.Consumer>
        </HStack>
    },[currentMonthState, date, item, next, nextMonth, nextMonthState, pickupSlot, prev, returnSlot, select, returnDate, pickupDate])

    return  <VStack w={largeScreen ? '100%' : '98%'} >
                <MediaDependent desktop={desktop} mobile={mobile}/>
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
