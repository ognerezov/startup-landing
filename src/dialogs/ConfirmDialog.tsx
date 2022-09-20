import React, {FC, useEffect, useMemo, useRef} from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Center,
    Spinner,
    Text,
} from '@chakra-ui/react'
import {useIntl} from "react-intl";
import {TextButton} from "../components/common/TextButton";
import {bearer, FetchState, getErrorMessage, useFetchState} from "../hooks/fetchState";

interface ConfirmDialogProps {
    onOk: () => void
    onClose : ()=>void
    isOpen : boolean
    title ?: string
    state : FetchState
    error : number
}

interface DeleteDialogProps {
    onClose: (confirmed : boolean) => void
    id ?: number
    title ?: string
    token : string
}

export const ConfirmDialog:FC<ConfirmDialogProps> =({state, error, isOpen,onOk, onClose, title})=>{
    const cancelRef = useRef<HTMLButtonElement>(null)
    const intl = useIntl();
    useEffect(()=>{
        if(state === FetchState.Finished && error ===200){
            onClose()
        }
    },[error, onClose, state])

    const dialog = useMemo(()=>{
        return <>
            <AlertDialogBody>
                {intl.formatMessage({"id": 'Confirm.question'})}
            </AlertDialogBody>

            <AlertDialogFooter>
                <TextButton onClick={onClose} mx = {'1vw'} px={'1vw'} variant={'medium_solid'} id={'Cancel'}/>
                <TextButton onClick={onOk} mx = {'1vw'} px={'1vw'}  variant={'medium_danger'} id={'Delete'}/>
            </AlertDialogFooter></>
    },[intl, onClose, onOk])

    const content = useMemo(()=>{
        switch (state) {
            case FetchState.NotStarted:
            default:
                return dialog
            case FetchState.InProgress:
                return(
                    <AlertDialogBody>
                        <Center w={'100%'} h={'100%'}>
                            <Spinner/>
                        </Center>
                    </AlertDialogBody>
                )
            case FetchState.Finished:
                return error === 200 ? null :
                    (<>
                        <AlertDialogBody>
                            <Center w={'100%'} h={'100%'}>
                                <Text variant='error'>
                                    {intl.formatMessage({id: getErrorMessage(error)})}
                                </Text>
                            </Center>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <TextButton onClick={onClose} mx = {'1vw'} px={'1vw'} variant={'medium_solid'} id={'Cancel'}/>
                        </AlertDialogFooter>
                    </>)
        }
    },[dialog, error, intl, onClose, state])

    return       (
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        blockScrollOnMount={false}
    >
        <AlertDialogOverlay>
            <AlertDialogContent>
                {title ?
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {title}
                    </AlertDialogHeader> : null
                }
                {content}
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
    )
}

export const DeleteConfirmDialog : FC<DeleteDialogProps> = ({onClose,id, token, title})=>{
    const intl = useIntl();
    const [,delState,delError, del, reset] = useFetchState<undefined,string>(`customer/items/${id}`,'DELETE',undefined);
    return (
        <ConfirmDialog
            state={delState}
            error={delError}
            title={title? `${intl.formatMessage({"id" :'Delete'})} ${title}?`: intl.formatMessage({"id" :'Confirm.delete'})}
            onOk={()=>{del('', bearer(token),true)}}
            onClose={()=>{
                onClose(delState === FetchState.Finished && delError === 200);
                reset()
            }}
            isOpen={!!id}/>)
}
