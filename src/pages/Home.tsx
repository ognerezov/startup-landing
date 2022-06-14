import React, {FC, useState} from 'react';
import {Box, Button, Text, useMediaQuery, VStack} from "@chakra-ui/react";
import BackgroundImage from "../components/BackgroundImage";
import EmailDialog from "../dialogs/EmailDialog";
import {QUERY_SCREEN_SIZE} from "./About";
import {useIntl} from "react-intl";

export const DEFAULT_GRADIENT = 'linear-gradient(45deg, #000B2A 0%, #011E4C 100%)'

interface HomeProps{
    onReport :(event: string)=>void;
}

interface HomeState{
    showBookDialog : boolean
}

const Home: FC<HomeProps>= props=>{
    const intl = useIntl();

    function onClose(){
        setState({...state,showBookDialog:false})
        props.onReport('Cancel Book a Demo')
    }

    function onSent(){
        setState({...state,showBookDialog:false})
        props.onReport('Demo booked!!!')
    }

    function getDialog(){
        return<EmailDialog
            title={intl.formatMessage({id:'Email.title'})}
            isOpen={state.showBookDialog}
            onClose={onClose}
            onSuccess={onSent}/>
    }
    const [state, setState] = useState<HomeState>({showBookDialog : false});
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    return <Box bg={DEFAULT_GRADIENT} h='100vh' w='100vw'>
                {getDialog()}
        <VStack
            spacing='3vmin'
            align='self-start'
            position='fixed' left={largeScreen ? '11vw':'4vw'} top='24vh' width={largeScreen ? '54vw':'92vw'}>
                    <Text variant='max' className='gradient-text'>
                        {intl.formatMessage({id: 'Home.1'})}
                        <br/>
                        {intl.formatMessage({id: 'Home.2'})}
                    </Text>
                <Box
                    borderRadius='1vmin' px='1.2vmin' py='2.4vmin'
                     bg='linear-gradient(180deg, #152445 0%, rgba(21, 36, 69, 0) 100%)'>
                    <Text>
                        <li>
                            {intl.formatMessage({id: 'Feature.0'})}
                        </li>
                        <li>
                            {intl.formatMessage({id: 'Feature.1'})}
                        </li>
                        <li>
                            {intl.formatMessage({id: 'Feature.2'})}
                        </li>
                        <li>
                            {intl.formatMessage({id: 'Feature.3'})}
                        </li>
                        <li>
                            {intl.formatMessage({id: 'Feature.5'})}
                        </li>
                        <li>
                            {intl.formatMessage({id: 'Feature.4'})}
                        </li>
                        <li>
                            {intl.formatMessage({id: 'Feature.6'})}
                        </li>
                    </Text>
                </Box>
                <Button
                    w={largeScreen ? undefined :'100%'}
                    onClick={()=>setState({...state,showBookDialog:true})}
                    variant='solid'>
                    Book A Demo
                </Button>

        </VStack>
                <Box width='53vw' h='100vh' ms='46vw' zIndex={2}>
                    <BackgroundImage/>
                </Box>
            </Box>
}

export default Home;