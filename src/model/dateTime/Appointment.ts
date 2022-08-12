export const DEFAULT_AVAILABLE_TIME : AvailableTime = {
    start : '10:00',
    end : '20:00',
    interval : 15
}

export interface AvailableTime{
    start : string
    end : string
    interval : number
}
