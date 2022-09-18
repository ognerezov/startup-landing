import React, {FC, useRef} from 'react'
import {
    AlertDialog, AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    useMediaQuery,
} from "@chakra-ui/react";
import {useIntl} from "react-intl";
import {TextButton} from "./TextButton";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {textVar} from "../../services/Style";

interface AlertProps{
    title : string
    text ?: string
    buttonText : string
    onCancel : ()=>void
    onOk : ()=>void
    isOpen : boolean
}

export const Alert : FC<AlertProps>= ({isOpen, title,text,buttonText,onCancel,onOk}) =>{
    const cancel = useRef<HTMLButtonElement>(null);
    const intl = useIntl();
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    if(!isOpen)
        return null
    return (
         <AlertDialog
                blockScrollOnMount={false}
                isOpen={isOpen}
                leastDestructiveRef={cancel}
                onClose={onCancel}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {intl.formatMessage({id:title})}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {intl.formatMessage({id:text || 'Alert.confirm'})}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <TextButton onClick={onCancel} id={'Cancel'} variant={textVar(largeScreen)} px={'1.5vmin'} mx={'0.5vmin'}/>
                            <TextButton onClick={onOk} id={buttonText} variant={textVar(largeScreen)+'_solid'} px={'1.5vmin'}/>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
    )
}
