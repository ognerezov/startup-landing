import React from 'react';
import './App.css';
import {Box, Button, Center, ChakraProvider, Text} from '@chakra-ui/react';
import {defaultTheme} from "./theme/defaultTheme";
import BackgroundImage from "./components/BackgroundImage";

function App() {
  return (
      <ChakraProvider theme={defaultTheme}>
        <Box bg='linear-gradient(45deg, #000B2A 0%, #011E4C 100%)' h='100vh' w='100vw'>
            <Box position='fixed' left='11vw' top='24vh'>
                <Text variant='max' className='gradient-text' title=''>
                    Best solution
                    <br/>
                    for your problem
                </Text>
            </Box>
            <Box position='fixed' left='11vw' top='40vh' w='30vw' borderRadius='1vmin' px='1.2vmin' py='2.4vmin'
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
            <Center position='fixed' left='11vw' top='65vh' w='30vw'>
                <Button variant='solid'>
                    Book A Demo
                </Button>
            </Center>
            <Box width='53vw' h='100vh' ms='46vw' zIndex={2}>
                <BackgroundImage/>
            </Box>
        </Box>
      </ChakraProvider>
  );
}

export default App;
