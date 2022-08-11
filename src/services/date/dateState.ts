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

export interface MonthState{
    [key : number] : DateState
}
