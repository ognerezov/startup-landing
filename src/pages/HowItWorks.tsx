import React from 'react';
import {DEFAULT_GRADIENT} from "./Home";
import {Box, Center, Text, useMediaQuery, VStack} from "@chakra-ui/react";

import BackgroundImage from "../components/BackgroundImage";
import {QUERY_SCREEN_SIZE} from "./About";

import scheme from '../images/scheme.png'
import app from '../images/app.png'
import charts from '../images/charts.png'

export function HowItWorks(){
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    return <Box bg={DEFAULT_GRADIENT}>
        <VStack
             position='fixed'
             width={largeScreen ? '70vw':'98vw'} pt='10vh'
             left={largeScreen ? '15vw':'1vw'}
             zIndex={2}
             overflowX='hidden' overflowY='scroll' maxHeight='90vh'>
            <Center width='100%'>
                <Text className='gradient-text' align='center' variant='caption_s' width='80%'>
                    Machine learning and analytics
                </Text>
            </Center>
            <Center width='100%'>
                <img  src={charts}  alt="scheme" width='80%'/>
            </Center>
            <Center width='100%'>
                <Text className='gradient-text' align='center' variant='caption_s' width='80%'>
                    Simple team dashboard
                </Text>
            </Center>
            <Center width='100%'>
                <img  src={app}  alt="scheme" width='80%' />
            </Center>
            <Center width='100%'>
                <Text className='gradient-text' align='center' variant='caption_s' width='80%'>
                    Complex infrastructure
                </Text>
            </Center>
            <Center width='100%'>
                <img  src={scheme}  alt="scheme" width='80%'/>
            </Center>
        </VStack>
        <Box  width='53vw' h='100vh' ms='46vw' zIndex={1}>
            <BackgroundImage/>
        </Box>
    </Box>
}