import React, {useEffect, useState} from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {defaultTheme} from "./theme/defaultTheme";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import {IntlProvider} from "react-intl";
import {EN, languages} from "./services/Languages";
import Contact from "./pages/Contact";
import {getIP} from "./services/FetchIP";
import {ClientInfo, getClientInfo} from "./services/ClientInfo";
import {report} from "./services/BehaviorService";
import {HowItWorks} from "./pages/HowItWorks";
import {Categories} from "./components/categories/Categories";
import {expandItems, IItemContext, ItemContext} from "./context/context";
import {Item} from "./model/items";

interface AppState{
    tab : string
    ip ?: string
    clientInfo : ClientInfo
}

const HOME = 'Home'
const ABOUT = 'About'
const CONTACT = 'Contact'
const HOW_IT_WORKS = 'Solution'


function App() {
    const [state, setState] = useState<AppState>({tab : HOME, clientInfo : getClientInfo()});
    const [data, setData] = useState<IItemContext>({});

    function setItems(items : Item[]){
        setData(expandItems(items))
    }

    function onReport(event : string){
        state.ip && report(event,state.ip, state.clientInfo)
    }

    function onGotIp(ip : string){
        setState({...state, ip});
        report('Start',ip, state.clientInfo)
    }

    function goHome(){
        setState({...state,tab: HOME})
    }

    useEffect(()=>{
        getIP().then(onGotIp)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    function getPage(){
        switch (state.tab) {
            case HOME:
                return <Categories
                    setItems={setItems}
                    onReport={onReport}
                    categories={[1,2,3,4,5,6,7,8,9,10]}/>
                // return <Home onReport={onReport}/>
            case HOW_IT_WORKS:
                return <HowItWorks/>
            case ABOUT:
                return <About/>
            case CONTACT :
                return <Contact
                    onClose={goHome}
                    onSuccess={()=>{
                        goHome();
                        onReport('Email from Contact sent!!!')
                        }}
                />
            default:
                return <NotFound/>
        }
    }
  const   currentLanguage = EN;

  function changeTab(tab : string) {
      setState({...state,tab})
      state.ip && report('Tab selected: '+tab, state.ip, state.clientInfo)
  }

  return (
      <ChakraProvider theme={defaultTheme}>
          <IntlProvider messages={languages[currentLanguage]} locale={currentLanguage}>
              <ItemContext.Provider value={{context : data, setContext : setData}}>
        <Header
            selected={state.tab}
            select={changeTab}
            buttons={[HOME,ABOUT,CONTACT]}
        />
          {getPage()}
              </ItemContext.Provider>
          </IntlProvider>
      </ChakraProvider>
  );
}

export default App;
