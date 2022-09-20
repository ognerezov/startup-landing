import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {Center, ChakraProvider, Spinner} from '@chakra-ui/react';
import {defaultTheme} from "./theme/defaultTheme";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import {IntlProvider} from "react-intl";
import {languages, systemLanguage} from "./services/Languages";
import Contact from "./pages/Contact";
import {getIP} from "./services/FetchIP";
import {ClientInfo, getClientInfo} from "./services/ClientInfo";
import {report} from "./services/BehaviorService";
import {
    EditState,
    expandItems,
    IItemContext,
    ItemContext,
    ItemContextService,
    ItemEditContext,
    noneItemEditContext,
    PurchasePhase
} from "./context/context";
import {EditItemRequest, Item} from "./model/items";
import {ItemView} from "./components/items/ItemView";
import {useParams} from "react-router";
import {getItemById} from "./backend/GetById";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {ItemCreator} from "./components/items/ItemCreator";
import {creatItem, updateItem} from "./backend/CreatItem";
import {Auth} from "./model/user";
import {useStorage} from "./hooks/storageHook";
import {INITIAL_AUTH, UserContext, UserContextService} from "./context/userContext";
import {STORAGE_AUTH} from "./storage/localStorage";
import {UserGateway} from "./components/authorization/UserGateway";
import {PaymentController} from "./components/payment/PaymentController";
import {Interval} from "./services/date/DateUtils";
import {OwnerPage} from "./components/owner/OwnerPage";
import {FetchState, useFetchState} from "./hooks/fetchState";
import {Category, DEFAULT_CATEGORIES} from "./components/categories/model";
import {Categories} from "./components/categories/Categories";
import {ItemEditor} from "./components/items/ItemEditor";

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
    const [auth, setAuth] = useStorage<Auth>(STORAGE_AUTH, INITIAL_AUTH)
    const [purchasePhase, setPurchasePhase] = useState<PurchasePhase>(PurchasePhase.NotStarted)
    const [rentalPeriod, setRentalPeriod] =useState<Interval | undefined>(undefined)
    const [ownerMode, setOwnerMode] = useState<boolean>(false)
    const [categories, getCategoriesState, , getCategories] = useFetchState<Category[],string>('categories','GET',DEFAULT_CATEGORIES)


    const editItem = useCallback((item : Item)=>{
        setEditContext({...editContext,editItem : item, state : EditState.Started})
    },[editContext])

    useEffect(()=>{
        if(getCategoriesState === FetchState.NotStarted){
            getCategories('')
        }
    },[getCategories, getCategoriesState])

    const onReport= useCallback((event : string)=>{
        state.ip && report(event,state.ip, state.clientInfo)
    },[state.clientInfo, state.ip])

    const toggleOwnerMode = useCallback((mode : boolean)=>{
        setOwnerMode(mode)
    },[])

    const context : ItemContextService =useMemo(()=>({
            context : data,
            setContext : setData,
            selectItem,
            selectedItem : item?.id,
            onReport,
            selectCategory :setCategory,
            selectedCategory : category,
            editContext,
            setEditContext,
            purchasePhase,
            setPurchasePhase,
            rentalPeriod,
            setRentalPeriod,
            categories,
            editItem,
        }),
        [categories, category, data, editContext, editItem, item?.id, onReport, purchasePhase, rentalPeriod]);

    const userContext : UserContextService = {auth : auth, setAuth : setAuth}

    function submitItem(item: EditItemRequest) {
        setEditContext({...editContext, state : EditState.Submitting})
        if (item.id){
            updateItem(item as Item,auth.token!)
                .then(() => {
                    console.log("item edited")
                    setEditContext({...editContext, state : EditState.Started, editItem : item as Item})
                })
                .catch(e => {
                    onReport('error updating an item: ' + e)
                    console.log('error: '+e)
                    setEditContext({...editContext, state : EditState.Error})
                })
            return
        }
        creatItem(item,auth.token!)
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

    const onGotIp = useCallback(()=>(ip : string)=>{
        setState({...state, ip});
        report('Start',ip, state.clientInfo)
    },[state])

    const goHome= useCallback(()=>{
        setState({...state,tab: HOME})
    },[state])

    useEffect(()=>{
        getIP().then(onGotIp)
    },[onGotIp])

    const page = useMemo(()=>{

        if(fetching){
            return <Center w={'100%'}
                           height='90vh'
                           position='fixed' top='9vh'>
                        <Spinner/>
                    </Center>
        }

        if(ownerMode){
            if (editContext.state !== EditState.NotStarted ){
                return <UserGateway quit={()=>{
                    setEditContext({...editContext,state : EditState.NotStarted})
                }}>
                    { editContext.editItem ?
                        <ItemEditor context={context}/> :
                        <ItemCreator context={context}/>
                    }
                </UserGateway>
            }
            return <OwnerPage setOwnerMode={setOwnerMode}/>
        }
        if(purchasePhase !== PurchasePhase.NotStarted){
            return <UserGateway quit={()=>{
                setPurchasePhase(PurchasePhase.NotStarted)
            }}>
                <PaymentController />
            </UserGateway>
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
                    categories={categories}/>
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
    }, [categories, context, editContext, fetching, goHome, item, onReport, ownerMode, prevCategory, purchasePhase, state.tab])

  const   currentLanguage = useMemo( ()=>systemLanguage(),[]);

  function changeTab(tab : string) {
      setState({...state,tab})
      state.ip && report('Tab selected: '+tab, state.ip, state.clientInfo)
  }

  return (
      <ChakraProvider theme={defaultTheme}>
          <IntlProvider messages={languages[currentLanguage]} locale={currentLanguage}>
              <ItemContext.Provider value={context}>
                  <UserContext.Provider value={userContext}>
                    <Header
                        ownerMode={ownerMode}
                        toggleOwnerMode={toggleOwnerMode}
                        context={context}
                        selected={state.tab}
                        select={changeTab}
                        buttons={[HOME,ABOUT,CONTACT]}
                    />
                      {page}
                  </UserContext.Provider>
              </ItemContext.Provider>
          </IntlProvider>
      </ChakraProvider>
  );
}

export default App;
