import {useIntl} from "react-intl";
import {useMemo} from "react";

export function useCurrency(initial : number):
    (val : number)=>string
{
    const intl =useIntl();

    return useMemo(() => ((val: number) => {
        return val / 100 + intl.formatMessage({"id": "Currency"})
    }), [intl])

}
