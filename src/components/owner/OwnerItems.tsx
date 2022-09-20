import React, {FC, ReactNode, useEffect, useMemo} from "react";
import {bearer, FetchState, getErrorMessage, useFetchState} from "../../hooks/fetchState";
import {Item} from "../../model/items";
import {AbsoluteCenter, Center, Spinner, Text} from "@chakra-ui/react";
import {useIntl} from "react-intl";
import {OwnerItemsTable} from "./OwnerItemsTable";
import {ItemContext} from "../../context/context";

interface OwnerItemsProps{
    token: string
}

export const OwnerItems : FC<OwnerItemsProps> =({token})=>{
    const [items,fetchState,error,getItems,reset] = useFetchState<Item [] | undefined,undefined>("customer/items" ,'GET',undefined)
    const intl = useIntl();
    useEffect(()=>{
        console.log("fetching items")
        if(fetchState !== FetchState.NotStarted){
            return
        }
        getItems(undefined,bearer(token))
    },[fetchState, getItems, token])

    const refresh = useMemo(()=>{
        return ()=> {
            reset()
            getItems(undefined, bearer(token))
        }
    },[reset, getItems, token])

    const content = useMemo<ReactNode>(()=>{
        switch (fetchState) {
            case FetchState.NotStarted:
            default:
            case FetchState.InProgress:
                return <Center w={'100%'} h={'100%'}>
                    <Spinner/>
                </Center>
            case FetchState.Finished:
                return error === 200 ?
                    <ItemContext.Consumer>
                        {context =>(
                            <OwnerItemsTable
                                items={items}
                                refresh={refresh}
                                editItem={context.editItem}/>
                        )}
                    </ItemContext.Consumer>:
                    <Center w={'100%'} h={'100%'}>
                        <Text variant='error'>
                            {intl.formatMessage({id: getErrorMessage(error)})}
                        </Text>
                    </Center>
        }
    },[error, fetchState, intl, items, refresh])

    return <AbsoluteCenter>{content}</AbsoluteCenter>
}
