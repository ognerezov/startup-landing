import React, {FC, useEffect, useMemo} from "react";
import {AbsoluteCenter, Center, Spinner, Text, VStack} from "@chakra-ui/react";
import {Item} from "../../model/items";
import {PurchasePhase} from "../../context/context";
import {sendEmail} from "../../services/LambdaService";
import {formattedCostOf, Interval} from "../../services/date/DateUtils";
import {useIntl} from "react-intl";
import {TextButton} from "../common/TextButton";

interface PaymentProcessorProps{
    item : Item
    phase : PurchasePhase
    onSuccess : () =>void
    onClose : ()=> void
    email : string
    rentalPeriod : Interval
}

export const PaymentProcessor: FC<PaymentProcessorProps> = ({item,phase,onSuccess, onClose, email, rentalPeriod})=>{
    const intl = useIntl()
    const rentalDetails = useMemo(()=>(
        `<table>
            <tr><td>Item</td><td>${item.name}</td></tr>
            <tr><td>Picup date</td><td>${rentalPeriod.pickupDate}</td></tr>
            <tr><td>Picup time</td><td>${rentalPeriod.pickupSlot}</td></tr>
            <tr><td>Retrun date</td><td>${rentalPeriod.returnDate}</td></tr>
            <tr><td>Return time</td><td>${rentalPeriod.returnSlot}</td></tr>
            <tr><td>Cost</td><td>${formattedCostOf(item,rentalPeriod) + intl.formatMessage({'id' :'Euro'})}</td></tr>
        </table>`
    ),[intl, item, rentalPeriod])
    useEffect(()=>{
        if(phase === PurchasePhase.Started){
             sendEmail({from : email,
                 subject : `Book item request id: ${item.id} name:${item.name} owner: ${item.email}`,
                 body : rentalDetails
             }).then(onSuccess)
            return
        }
    },[email, item, onSuccess, phase, rentalDetails])

    return (
        <AbsoluteCenter>
            { phase === PurchasePhase.Started ?
                <Spinner/> :
                <VStack>
                    <Text variant ={'regular'}>
                        {intl.formatMessage({id: 'Book.success'})}
                    </Text>
                    <Center w={'100%'} pt={'4vh'}>
                        <TextButton onClick={onClose} id={'Back'} variant={'medium_selected'} px ={'2vw'}/>
                    </Center>
                </VStack>
            }
    </AbsoluteCenter>
    )
}
