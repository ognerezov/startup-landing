import React from 'react';
import {DEFAULT_GRADIENT} from "./Home";
import {Box, Center, Text, useMediaQuery, VStack} from "@chakra-ui/react";

import BackgroundImage from "../components/BackgroundImage";
import {QUERY_SCREEN_SIZE} from "./About";

import scheme from '../images/scheme.png'
import app from '../images/app.png'
import {useIntl} from "react-intl";

export function HowItWorks(){
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const intl = useIntl();
    return <Box bg={DEFAULT_GRADIENT}>
        <VStack
             position='fixed'
             width={largeScreen ? '70vw':'98vw'} pt='10vh'
             left={largeScreen ? '15vw':'1vw'}
             zIndex={2}
             overflowX='hidden' overflowY='scroll' maxHeight='90vh'>
            <Center width='100%'>
                <Text className='gradient-text' align='start' variant='caption_s' width='80%'>
                    {intl.formatMessage({id: 'Solution.1'})}
                    <br/>
                    {intl.formatMessage({id: 'Solution.2'})}
                </Text>
            </Center>
            <Center width='100%'>
                <img  src={scheme}  alt="scheme" width='80%'/>
            </Center>
            <Center width='100%'>
                <Text className='gradient-text' align='center' variant='caption_s' width='80%'>
                    {intl.formatMessage({id: 'Solution.3'})}
                </Text>
            </Center>
            <Center width='100%'>
                <img  src={app}  alt="scheme" width='80%' />
            </Center>
        </VStack>
        <Box  width='53vw' h='100vh' ms='46vw' zIndex={1}>
            <BackgroundImage/>
        </Box>
    </Box>
}