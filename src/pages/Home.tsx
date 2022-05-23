import React, {FC, useState} from 'react';
import {Box, Button, Text, useMediaQuery, VStack} from "@chakra-ui/react";
import BackgroundImage from "../components/BackgroundImage";
import EmailDialog from "../dialogs/EmailDialog";
import {QUERY_SCREEN_SIZE} from "./About";

export const DEFAULT_GRADIENT = 'linear-gradient(45deg, #000B2A 0%, #011E4C 100%)'

interface HomeProps{
    onReport :(event: string)=>void;
}

interface HomeState{
    showBookDialog : boolean
}

const Home: FC<HomeProps>= props=>{

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
                        Optimal stress level
                        <br/>
                        Best performance
                    </Text>
                <Box
                    borderRadius='1vmin' px='1.2vmin' py='2.4vmin'
                     bg='linear-gradient(180deg, #152445 0%, rgba(21, 36, 69, 0) 100%)'>
                    <Text>
                        <li>
                            Understand your team better
                        </li>
                        <li>
                            Find best time in a game for each player
                        </li>
                        <li>
                            Avoid excessive training
                        </li>
                        <li>
                            Easy to use
                        </li>
                        <li>
                            3 month for free
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