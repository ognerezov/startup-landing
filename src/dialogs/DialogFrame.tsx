import React, {FC} from 'react'
import {createPortal} from "react-dom";
import {
    Box,
    Center, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Spacer,
    useMediaQuery
} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../pages/About";
import {PageHeader} from "../components/common/PageHeader";
import {TextButton} from "../components/common/TextButton";

interface DialogFrameProps{
    children?: React.ReactNode;
    w ?:string
    h ?: string
    title ?: string
    isOpen : boolean
    onClose : ()=>void
}

export const DialogFrame : FC<DialogFrameProps> = ({children,w,h,title,isOpen,onClose}) => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    if(!isOpen) {
        return  null;
    }
    return largeScreen ? createPortal(
        <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                w={w}
                h={h}
                maxW={w} background={'white'} overflowY={'auto'} overflowX={'hidden'}>
                <ModalHeader color='blue.300'>{title}</ModalHeader>
                <ModalCloseButton color='blue.300'/>
                <ModalBody>
                    <Center>
                        {children}
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>,document.getElementById('overlay-root')!)
        : <Box
            position = {'fixed'}
            zIndex={4}
            w={'100vw'}
            h={'100vh'}
            background={'white'} overflowY={'auto'} overflowX={'hidden'}
            pb = {'10vh'}
        >
            <PageHeader>
                <Spacer/>
                <TextButton onClick={onClose} id={'Back'} px={'1.1vmin'} variant = 'medium'/> :
            </PageHeader>
            {children}
    </Box>
}
