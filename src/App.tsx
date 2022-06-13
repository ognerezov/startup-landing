import React, {FC, useEffect, useState} from 'react';
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
import {ItemView} from "./components/items/ItemView";
import {useParams} from "react-router";
import {getItemById} from "./backend/GetById";

interface AppState{
    tab : string
    ip ?: string
    clientInfo : ClientInfo
}

const HOME = 'Home'
const ABOUT = 'About'
const CONTACT = 'Contact'
const HOW_IT_WORKS = 'Solution'

interface RouteParams{
    scope ?: string
    id ?: string
    query ?: string
}

const App: FC = () => {
    const params : RouteParams = useParams<{scope ?: string, id ?: string, query?:string}>()
    const [state, setState] = useState<AppState>({tab : HOME, clientInfo : getClientInfo()});
    const [data, setData] = useState<IItemContext>({});
    const [item, setItem] = useState<Item|undefined>(undefined)

    useEffect( ()=>{
        if(params.scope === 'item' && params.id){
            if (data.items && data.items[params.id]){
                //console.log(data.items[params.id])
                setItem(data.items[params.id])
            } else{
                getItemById(params.id)
                    .then(setItems)
                    .catch(console.log)
            }
        }
    },[params,data])
    function setItems(items : Item[]){
        console.log("set items")
        console.log(items)
        setData(expandItems(items))
    }

    function selectItem(item :Item){
        console.log(item)
        setItem(item)
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

        if(item){
            return <ItemView item={item}/>
        }
        switch (state.tab) {
            case HOME:
                return <Categories
                    context={data}
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
              <ItemContext.Provider value={{context : data, setContext : setData, selectItem}}>
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
