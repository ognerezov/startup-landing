import {useIntl} from "react-intl";
import {useMemo} from "react";
import {Item} from "../model/items";

export function useCurrency():
    (val : number)=>string
{
    const intl =useIntl();

    return useMemo(() => ((val: number) => {
        return val / 100 + intl.formatMessage({"id": "Currency"})
    }), [intl])
}

export function useItemPrice():
    (val : Item)=>string
{
    const intl =useIntl();

    return useMemo(() => ((item: Item) => {
        const {pricePerHour, pricePerDay, pricePerWeek, pricePerMonth} = item
        let p : number
        let time : string
        if(pricePerHour){
            p = pricePerHour
            time = intl.formatMessage({id: 'Time.hour'})
        } else if (pricePerDay){
            p = pricePerDay
            time = intl.formatMessage({id: 'Time.day'})
        } else if (pricePerWeek){
            p = pricePerWeek
            time = intl.formatMessage({id: 'Time.week'})
        } else {
            p = pricePerMonth
            time = intl.formatMessage({id: 'Time.month'})
        }

        return `${p / 100 + intl.formatMessage({"id": "Currency"})}/${time}`
    }), [intl])
}
