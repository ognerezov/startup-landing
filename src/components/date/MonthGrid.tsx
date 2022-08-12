import React, {FC} from 'react'
import {HStack, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {getMonth, isDateBeforeToday} from "../../services/date/DateUtils";
import {DateCell} from "./DateCell";
import {TextButton} from "../common/TextButton";
import {DateState, MonthState} from "../../services/date/dateState";


interface DatePickerProps{
    date : Date
    next ?: ()=>void
    prev ?: ()=>void
    select : (day: number) =>void
    state : MonthState
}

export const MonthGrid : FC<DatePickerProps> = ({date, prev, next, select, state}) => {
    const month = getMonth(date);
    function getDateState(d : Date) : DateState{
        return isDateBeforeToday(d) ? DateState.Past : DateState.Free;
    }


    function getDayState(day: number){
        if(day <= 0){
            return DateState.Empty
        }
        const currentState = state[day];
        return currentState === undefined ? getDateState(new Date(date.getFullYear(),date.getMonth(),day)) : currentState;
    }

    function selectDay(day : number){
        select(day)
    }


    return <VStack>
                <HStack>
                    {prev ?
                        <TextButton onClick={prev} text={'<'} variant={'medium'}/> : null
                    }
                    <Text variant={'medium_solid'} px={'1vw'}>
                        {date.toLocaleDateString('default',{  month: 'long', year: 'numeric' })}
                    </Text>
                    {next ?
                        <TextButton onClick={next} text={'>'} variant={'medium'}/> : null
                    }
                </HStack>
                <SimpleGrid
                    alignItems='start'
                    justifyItems='center'
                    spacingY={'0.5vh'}
                    p={'5vmin'}
                    templateColumns={`repeat(7, 1fr)`} gap={1}
                >
                    {month.map((day,index) =>
                        <DateCell w={'5vmin'} h={'5vmin'}
                                  onClick={()=>selectDay(day)}
                                  state={getDayState(day)}
                                  dayOfMonth={day} key={index}/>)}
                </SimpleGrid>
    </VStack>
}
