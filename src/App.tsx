import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {Center, ChakraProvider, Spinner} from '@chakra-ui/react';
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
import {Categories} from "./components/categories/Categories";
import {
    EditState,
    expandItems,
    IItemContext,
    ItemContext,
    ItemContextService,
    ItemEditContext,
    noneItemEditContext
} from "./context/context";
import {AddItemRequest, Item} from "./model/items";
import {ItemView} from "./components/items/ItemView";
import {useParams} from "react-router";
import {getItemById} from "./backend/GetById";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {ItemCreator} from "./components/items/ItemCreator";
import {creatItem} from "./backend/CreatItem";

interface AppState{
    tab : string
    ip ?: string
    clientInfo : ClientInfo
}

const HOME = 'Home'
const ABOUT = 'About'
const CONTACT = 'Contact'

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
    const [category, setCategory] = useState<number|undefined>(undefined)
    const [prevCategory, setPrevCategory] = useState<number|undefined>(undefined)
    const [editContext, setEditContext] = useState<ItemEditContext>(noneItemEditContext(submitItem))
    const [fetching, setFetching] = useState<boolean>(false)

    const context : ItemContextService = {context : data, setContext : setData, selectItem,selectedItem : item?.id, onReport,selectCategory :setCategory, selectedCategory : category, editContext, setEditContext}

    function submitItem(item: AddItemRequest) {
        setEditContext({...editContext, state : EditState.Submitting})
        creatItem(item)
            .then(data => {
                onReport('item submitted: ' + data.id)
                setEditContext({...editContext, state : EditState.Submitted, id : data.id})
            })
            .catch(e => {
                onReport('error submitting an item: ' + e)
                console.log('error: '+e)
                setEditContext({...editContext, state : EditState.Error})
            })
    }

    useEffect( ()=>{
        if(params.scope === 'item' && params.id){
            if (data.items && data.items[params.id]){
                //console.log(data.items[params.id])
                setItem(data.items[params.id])
            } else{
                setFetching(true)
                getItemById(params.id)
                    .then(setItems)
                    .catch(e =>{
                        setFetching(false)
                        console.log(e)
                    })
            }
        } else if(params.scope === 'category' && params.id){
            const num = +params.id
            console.log(num)

            if(!isNaN(num)) {

                if(params.query ==='list'){
                    setEditContext({...editContext, state : EditState.Started, category : num})
                }

                setPrevCategory(category)
                setCategory(num)
            }
        }
        if(params.scope){
            onReport(`application entered with params scope: ${params.scope}, id: ${params.id}, query: ${params.query} `)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params,data])
    function setItems(items : Item[]){
        setFetching(false)
        setData(expandItems(items))
    }

    function selectItem(item ?:Item){
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

        if(fetching){
            return <Center w={'100%'}
                           height='90vh'
                           position='fixed' top='9vh'>
                        <Spinner/>
                    </Center>
        }

        if(item){
            return <ItemView item={item}/>
        }
        switch (state.tab) {
            case HOME:
                return <Categories
                    previousCategory={prevCategory}
                    context={context}
                    setItems={setItems}
                    onReport={onReport}
                    categories={[1,2,3,4,5,6,7,8,9,10]}/>
                // return <Home onReport={onReport}/>
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
              <ItemContext.Provider value={context}>
        <Header
            context={context}
            selected={state.tab}
            select={changeTab}
            buttons={[HOME,ABOUT,CONTACT]}
        />
          {editContext.state !== EditState.NotStarted ?
                       <ItemCreator context={context}/> : getPage()}
              </ItemContext.Provider>
          </IntlProvider>
      </ChakraProvider>
  );
}

export default App;
