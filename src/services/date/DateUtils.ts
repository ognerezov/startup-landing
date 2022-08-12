import {AvailableTime} from "../../model/dateTime/Appointment";

export function getMonth(date : Date){
    const dayOfMonth = date.getDate();
    const dayOfWeek  = date.getDay();
    const weekShift = dayOfWeek && dayOfMonth % dayOfWeek;
    // console.log(weekShift)
    // const numberOfWeeks = (weekShift + daysInAMonth(date)) / 7;
    const res : number [] = []
    let count = 1 - weekShift;
    while (count <= daysInAMonth(date)){
        res.push(Math.max(0,count++))
    }
    return res;
}

export function isDateBeforeToday(date : Date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

export function daysInAMonth(date : Date) {
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}

export function isSameDay(date : Date, month : Date, day : number) : boolean{
    return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth() && date.getDate() === day;
}

export function getDateWithDayOfMonth(month: Date, day: number) {
    return new Date(month.getFullYear(), month.getMonth(), day);
}

export function getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}


export function getDateTimeSlots(date: Date, availableTime : AvailableTime) : string[]{
    const res : string [] = []

    const startTime = getTimeAtDate(date,availableTime.start);
    const endTime = getTimeAtDate(date,availableTime.end);

    let time = startTime;

    while (time < endTime){
        res.push(getTimeString(time))
        time.setMinutes(time.getMinutes() + availableTime.interval)
    }

    return res;
}

export function getTimeAtDate(date : Date, time : string){
    const dateStr = date.toISOString().split('T')[0];
    const newDateStr = dateStr + 'T' + time+':00'
    return convertTZ(new Date(newDateStr), getTimeZone());
}

export function getDisplayTimeAtDate(date : Date, time : string) : string{
    return getTimeAtDate(date,time).toLocaleString('default', {
        day : "numeric",
        month : "long",
        year : "numeric",
        hour : "numeric",
        minute : "numeric"
    })
}

const TIME_SEPARATOR = ":";

function convertTZ(date : Date, tzString : string) {
    return new Date(date.toLocaleString("en-US", {timeZone: tzString}));
}

export function getTimeString(date : Date): string{
    const time  = date.toTimeString().split(" ")[0].split(TIME_SEPARATOR);
    return time[0]  + TIME_SEPARATOR + time[1];
}
