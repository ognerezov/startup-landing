import React, {useEffect, useState} from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {defaultTheme} from "./theme/defaultTheme";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import {IntlProvider} from "react-intl";
import {EN, languages} from "./services/Languages";
import Contact from "./pages/Contact";
import {getIP} from "./services/FetchIP";

interface AppState{
    tab : string
    ip ?: string
}

const HOME = 'Home'
const ABOUT = 'About'
const CONTACT = 'Contact'


function App() {
    const [state, setState] = useState<AppState>({tab : HOME});
    useEffect(()=>{
        getIP().then( ip => setState({...state, ip}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    function getPage(){
        switch (state.tab) {
            case HOME:
                return <Home/>
            case ABOUT:
                return <About/>
            case CONTACT :
                return <Contact onClose={()=>{setState({...state,tab: HOME})}}/>
            default:
                return <NotFound/>
        }
    }
  const   currentLanguage = EN;
  return (
      <ChakraProvider theme={defaultTheme}>
          <IntlProvider messages={languages[currentLanguage]} locale={currentLanguage}>
        <Header
            selected={state.tab}
            select={tab => {setState({...state,tab})}}
            buttons={['Home','About','Contact']}
        />
          {getPage()}
          </IntlProvider>
      </ChakraProvider>
  );
}

export default App;
