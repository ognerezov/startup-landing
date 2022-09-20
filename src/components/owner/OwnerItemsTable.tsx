import {Item} from "../../model/items";
import React, {FC, useMemo, useState} from "react";
import {
    Box, useMediaQuery, Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer, HStack,
} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {NoItemsFound} from "../items/NoItemsFound";
import {ItemImage} from "../common/ItemImage";
import {DEFAULT_IMAGE} from "../../context/context";
import {TextButton} from "../common/TextButton";
import {useCurrency} from "../../hooks/currency";
import {DeleteConfirmDialog} from "../../dialogs/ConfirmDialog";
import {UserContext} from "../../context/userContext";

interface OwnerItemsTableProps{
    items ?: Item[]
    refresh : ()=>void
    editItem : (item : Item)=>void
}

export const OwnerItemsTable : FC<OwnerItemsTableProps> = ({items,refresh, editItem})=>{
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const convert = useCurrency();
    const [delItem, setDelItem] = useState<Item | undefined>(undefined)

    const onDeleteConfirm = useMemo(()=>(
        function (confirmed : boolean) {
            setDelItem(undefined)
            if(confirmed){
                refresh()
            }
        }
    ),[refresh])

    return useMemo(()=>{

        if (!items || items.length === 0){
            return <NoItemsFound/>
        }

        return largeScreen ?
                <> {delItem ?<UserContext.Consumer>{auth =>(auth.auth.token ?
                        <DeleteConfirmDialog onClose={onDeleteConfirm} id ={delItem.id} title={delItem.name}  token={auth.auth.token}/> : null
                    )}
                </UserContext.Consumer> : null}
                    <TableContainer         width='100vw'
                                            maxWidth={'100vw'}
                                            height='94vh'
                                            overflowY = {'auto'}
                                            marginTop = {'6vh'}
                                            left='0'
                                            borderColor={'blue.300'}
                                            borderBottomWidth={'1px'} >
                    <Table variant='striped' size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Picture</Th>
                                <Th>Name</Th>
                                <Th>Price/hour</Th>
                                <Th>Price/day</Th>
                                <Th>Price/week</Th>
                                <Th>Price/month</Th>
                                <Th>Value</Th>
                                <Th ></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items.map((item,index)=>(
                                <Tr key={index}>
                                    <Td>
                                        {item.id}
                                    </Td>
                                    <Td width={'10%'}>
                                        <ItemImage
                                            path={item.id + DEFAULT_IMAGE} alt={item.name} width={'100%'}/>
                                    </Td>
                                    <Td      style={{
                                        wordWrap: "break-word",
                                    }}>
                                        {item.name}
                                    </Td>
                                    <Td >
                                        {convert(item.pricePerHour)}
                                    </Td>
                                    <Td >
                                        {convert(item.pricePerDay)}
                                    </Td>
                                    <Td >
                                        {convert(item.pricePerWeek)}
                                    </Td>
                                    <Td >
                                        {convert(item.pricePerMonth)}
                                    </Td>
                                    <Td >
                                        {convert(item.price)}
                                    </Td>
                                    <Td width={'15%'}>
                                        <HStack spacing={'1vmin'} width={'100%'}>
                                            <TextButton onClick={()=>{editItem(item)}} px={'1vmin'} variant={'medium_solid'} id={'Items.edit'}/>
                                            <TextButton onClick={()=>{setDelItem(item)}} px={'1vmin'}  variant={'medium_danger'} id={'Delete'}/>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer></>
 :
            <Box
                width='100vw'
                height='94vh'
                position='fixed' top='6vh'
                left='0'
            >
                not supported on mobile

            </Box>
    },[convert, delItem, items, largeScreen, onDeleteConfirm, editItem])
}
