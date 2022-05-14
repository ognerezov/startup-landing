import React from 'react';
import {Box, Text, useMediaQuery} from "@chakra-ui/react";
import BackgroundImage from "../components/BackgroundImage";
import {DEFAULT_GRADIENT} from "./Home";
export const QUERY_SCREEN_SIZE = '(min-width: 1023px)';

function About(){
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    return <Box bg={DEFAULT_GRADIENT} h='100vh' w='100vw'>
        <Box position='fixed' left='11vw' top='24vh'>
            <Text variant='max' className='gradient-text'>
                Our team
            </Text>
        </Box>
        <Box position='fixed' left='11vw' top='40vh' w={largeScreen ? '30vw':'76vw'} borderRadius='1vmin' px='1.2vmin' py='2.4vmin'
             bg='linear-gradient(180deg, #152445 0%, rgba(21, 36, 69, 0) 100%)'>
            <Text>
                <li>
                    Internation team based in Valencia, Spain
                </li>
                <li>
                    Supported and funded by Demium and TBC
                </li>
                <li>
                    Professionals of the industry
                </li>
                <li>
                    Best software engineers
                </li>
            </Text>
        </Box>
        <Box width='53vw' h='100vh' ms='46vw' zIndex={2}>
            <BackgroundImage/>
        </Box>
    </Box>
}

export default About;