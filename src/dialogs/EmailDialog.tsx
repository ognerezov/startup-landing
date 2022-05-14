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
}

export interface DialogProps extends BasicDialogProps{
    isOpen : boolean
}

const EmailDialog : FC<DialogProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    return  <Modal
                isOpen={props.isOpen}
                onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent maxW={largeScreen ? '54vw':'98vw'} background='#011135'>
                    <ModalHeader color='#FFF'>Book A Demo</ModalHeader>
                    <ModalCloseButton color='#FFF'/>
                    <ModalBody>
                        <Center>
                            <EmailMe
                                subject='From book a Demo landing'
                                onClose={props.onClose}
                                onSuccess={props.onClose}
                                width={largeScreen? '50vw':'96vw'}
                                textNotRequired={true}/>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
}

export default EmailDialog;