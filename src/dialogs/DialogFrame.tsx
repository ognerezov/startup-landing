import React, {FC} from 'react'
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
    return largeScreen ? <Modal
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
        </Modal>
        : <Box
            position = {'fixed'}
            zIndex={4}
            w={'100vw'}
            h={'100vh'}
            maxW={'100vh'} background={'white'} overflowY={'auto'} overflowX={'hidden'}
            py = {'10vh'}
        >
            <PageHeader>
                <Spacer/>
                <TextButton onClick={onClose} id={'Back'} px={'1.1vmin'} variant = 'medium'/> :
            </PageHeader>
            {children}
    </Box>
}