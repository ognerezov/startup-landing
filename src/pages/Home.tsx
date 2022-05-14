import React, {useState} from 'react';
import {Box, Button, Center, Text, useMediaQuery} from "@chakra-ui/react";
import BackgroundImage from "../components/BackgroundImage";
import EmailDialog from "../dialogs/EmailDialog";
import {QUERY_SCREEN_SIZE} from "./About";

export const DEFAULT_GRADIENT = 'linear-gradient(45deg, #000B2A 0%, #011E4C 100%)'
interface HomeState{
    showBookDialog : boolean
}

function Home(){
    function getDialog(){
        return<EmailDialog
            isOpen={state.showBookDialog}
            onClose={()=>setState({...state,showBookDialog:false})}/>
    }
    const [state, setState] = useState<HomeState>({showBookDialog : false});
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    return <Box bg={DEFAULT_GRADIENT} h='100vh' w='100vw'>
                {getDialog()}
                <Box position='fixed' left='11vw' top='24vh' width={largeScreen ? '54vw':'98vw'}>
                    <Text variant='max' className='gradient-text'>
                        Retail KPI
                        <br/>
                        analytics platform
                    </Text>
                </Box>
                <Box position='fixed' left='11vw' top='40vh' w={largeScreen ? '30vw' : '76vw'} borderRadius='1vmin' px='1.2vmin' py='2.4vmin'
                     bg='linear-gradient(180deg, #152445 0%, rgba(21, 36, 69, 0) 100%)'>
                    <Text>
                        <li>
                            Total control over your items
                        </li>
                        <li>
                            Data integration and visualization
                        </li>
                        <li>
                            Data analytics
                        </li>
                        <li>
                            Easy to use
                        </li>
                        <li>
                            3 month for free
                        </li>
                    </Text>
                </Box>
                <Center position='fixed' left='11vw' top={largeScreen ? '65vh' : '90vh'} w='30vw'>
                    <Button
                        onClick={()=>setState({...state,showBookDialog:true})}
                        variant='solid'>
                        Book A Demo
                    </Button>
                </Center>
                <Box width='53vw' h='100vh' ms='46vw' zIndex={2}>
                    <BackgroundImage/>
                </Box>
            </Box>
}

export default Home;