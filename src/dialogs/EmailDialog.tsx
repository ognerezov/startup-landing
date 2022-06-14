import React, {FC} from 'react';
import {
    Center,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, useMediaQuery
} from "@chakra-ui/react";
import {EmailMe} from "../forms/EmailMe";
import {QUERY_SCREEN_SIZE} from "../pages/About";

export interface BasicDialogProps {
    onClose : ()=>void
    onSuccess :()=>void
}

export interface DialogProps extends BasicDialogProps{
    isOpen : boolean
    title : string
    subject ?: string
}

const EmailDialog : FC<DialogProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    return  <Modal
                isOpen={props.isOpen}
                onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent maxW={largeScreen ? '66vw':'98vw'} background='#011135'>
                    <ModalHeader color='#FFF'>{props.title}</ModalHeader>
                    <ModalCloseButton color='#FFF'/>
                    <ModalBody>
                        <Center>
                            <EmailMe
                                subject={props.subject ? props.subject : 'From book a Demo landing'}
                                onClose={props.onClose}
                                onSuccess={props.onSuccess}
                                width={largeScreen? '50vw':'96vw'}
                                textNotRequired={true}/>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
}

export default EmailDialog;