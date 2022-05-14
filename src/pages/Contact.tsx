import React,{FC} from 'react';
import {Box, useMediaQuery} from "@chakra-ui/react";
import {EmailMe} from "../forms/EmailMe";
import BackgroundImage from "../components/BackgroundImage";
import {DEFAULT_GRADIENT} from "./Home";
import {BasicDialogProps} from "../dialogs/EmailDialog";
import {QUERY_SCREEN_SIZE} from "./About";


const Contact :FC<BasicDialogProps> = props => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    return <Box bg={DEFAULT_GRADIENT}>
        <Box position='fixed' width={largeScreen ? '54vw':'98vw'} ms='2vw' pt='20vh' zIndex={2}>
            <EmailMe
                subject='From contact page landing'
                onClose={props.onClose}
                onSuccess={props.onClose}
                height='80vh'
            />
        </Box>
        <Box  width='53vw' h='100vh' ms='46vw' zIndex={1}>
            <BackgroundImage/>
        </Box>
    </Box>
}
export default Contact;