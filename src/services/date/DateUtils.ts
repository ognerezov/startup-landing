export function getMonth(date : Date){
    const dayOfMonth = date.getDate();
    const dayOfWeek  = date.getDay();
    // console.log(dayOfMonth);
    // console.log(dayOfWeek);
    const weekShift = dayOfWeek && dayOfMonth % dayOfWeek;
    // console.log(weekShift)
    // const numberOfWeeks = (weekShift + daysInAMonth(date)) / 7;
    const res : number [] = []
    let count = 1 - weekShift;
    // console.log(daysInAMonth(date))
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
