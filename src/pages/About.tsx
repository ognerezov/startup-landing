import React from 'react';
import {Box, Text, useMediaQuery, VStack} from "@chakra-ui/react";
import BackgroundImage from "../components/BackgroundImage";
import {DEFAULT_GRADIENT} from "./Home";
export const QUERY_SCREEN_SIZE = '(min-width: 1023px)';

function About(){
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    return <Box bg={DEFAULT_GRADIENT} h='100vh' w='100vw'>
                <VStack
                    spacing='3vmin'
                    align='self-start'
                    position='fixed' left={largeScreen ? '11vw':'4vw'} top='24vh' width={largeScreen ? '54vw':'92vw'}>
                    <Text variant='max' className='gradient-text'>
                        Our team
                    </Text>
                <Box borderRadius='1vmin' px='1.2vmin' py='2.4vmin'
                     bg='linear-gradient(180deg, #152445 0%, rgba(21, 36, 69, 0) 100%)'>
                    <Text>
                        <li>
                            International team based in Valencia, Spain
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
            </VStack>
        <Box width='53vw' h='100vh' ms='46vw' zIndex={2}>
            <BackgroundImage/>
        </Box>
    </Box>
}

export default About;