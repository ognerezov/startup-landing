import React, {FC, useEffect, useState} from 'react';
import {HStack} from "@chakra-ui/react";
import {MonthGrid} from "./MonthGrid";
import {DateState, MonthState} from "../../services/date/dateState";
import {daysInAMonth, isSameDay} from "../../services/date/DateUtils";

interface IntervalPickerProps{

}

function getDateWithDayOfMonth(month: Date, day: number) {
    return new Date(month.getFullYear(), month.getMonth(), day);
}


export const IntervalPicker : FC<IntervalPickerProps> = props => {
    const [date, setDate] = useState<Date>(new Date());
    const [selectionStart, setSelectionStart] = useState<Date|undefined>();
    const [selectionEnd, setSelectionEnd] = useState<Date|undefined>();
    const [currentMonthState, setCurrentMonthState] = useState<MonthState>({})
    const [nextMonthState, setNextMonthState] = useState<MonthState>({})
    const nextMonth = new Date(date.getFullYear(), date.getMonth()+1,date.getDate());


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
    },[date])

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
            console.log(currentMonthState)
            console.log(nextMonthState)
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
            console.log(currentMonthState)
            console.log(nextMonthState)
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

        console.log(currentMonthState)
        console.log(nextMonthState)
    }

    function prev(){
        setDate(new Date(date.getFullYear(), date.getMonth()-1,date.getDate()))
    }

    function next(){
        setDate(new Date(date.getFullYear(), date.getMonth()+1,date.getDate()))
    }

    return <HStack spacing={'1vw'} className={'bordered-blue'} alignItems={'start'} p={'2vmin'}>
        <MonthGrid select={day => {select(day,date)}} date={date} prev={prev} key ={1} state={currentMonthState}/>
        <MonthGrid date={nextMonth} next={next} key ={2} select={day => {select(day,nextMonth)}} state={nextMonthState}/>
    </HStack>
}
