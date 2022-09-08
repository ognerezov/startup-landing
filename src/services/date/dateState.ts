export enum DateState{
    Empty = -1,
    Past,
    Free,
    Taken,
    Partial,
    Selected,
    SelectionStart,
    SelectionEnd
}

export interface MonthState {
    [key : number] : DateState
}

export interface HoursState{
    [key : string] : DateState;
}

export function isDisabled(state : DateState){
    return state === DateState.Past || state === DateState.Taken
}
