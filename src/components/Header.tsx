import React, {FC} from 'react';
import {Flex, HStack, Spacer, useMediaQuery} from "@chakra-ui/react";
import RadioButton from "./RadioButton";
import {useIntl} from "react-intl";
import {goHome, goToCategory} from "../config/ServerAddress";
import {EditState, ItemContextService} from "../context/context";
import {TextButton} from "./common/TextButton";
import {QUERY_SCREEN_SIZE} from "../pages/About";
import {textVar} from "../services/Style";
import fav from "../images/favicon_1.png";
import {UserHeader} from "./user/UserHeader";

interface HeaderProps{
    selected ?: string
    select : (val: string)=>void
    buttons : string[]
    context : ItemContextService
    ownerMode : boolean
    toggleOwnerMode : () =>void
}

const Header : FC<HeaderProps> = props => {
    const intl = useIntl();
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)

    function textVariant(){
        return textVar(largeScreen);
    }
    return <Flex
                px = '1vw'
                backgroundColor='white'
                borderColor={'blue.300'}
                borderBottomWidth={'1px'}
                position='fixed'
                left='0' top='0' width='100vw' height = '6vh'
                zIndex={3}>
                <img onClick={goHome} className={'img-btn'} src={fav} height={'5.6vh'} alt={intl.formatMessage({id: 'Company.name'})}/>
                <Spacer/>
                <UserHeader textVariant={textVariant()}/>
                <Spacer/>
                <TextButton
                    onClick={props.toggleOwnerMode}
                    id={props.ownerMode ? 'Items.search' : 'Items.my'}
                    px={'1.1vmin'} mx={'1.1vmin'} variant = {textVariant() +'_solid'}/>
                    {props.context.selectedCategory && props.context.editContext.state === EditState.NotStarted ?
                    <TextButton
                    onClick={()=>{
                        props.context.setEditContext({
                         ...props.context.editContext,
                         state : EditState.Started,
                         category : props.context.selectedCategory
                        })
                    }}
                    id={'Category.list.items'}
                    px={'1.1vmin'}
                    variant = {textVariant() +'_solid'}/>
                    : null}
        {  props.context.selectedItem || props.context.selectedCategory ?
            <TextButton onClick={()=>{
                if(props.context.editContext.state !== EditState.NotStarted){
                    props.context.setEditContext({...props.context.editContext, state : EditState.NotStarted})
                    if(props.context.editContext.category) {
                        goToCategory(props.context.editContext.category!)
                    } else {
                        goHome()
                    }
                } else {
                    props.context.selectItem(undefined)
                    goHome()
                }
            }} id={'Back'} px={'1.1vmin'} variant = {textVariant()}/> :
            <HStack spacing='0.5vw'>
                {props.buttons.map(btn => <RadioButton
                    className={'px'}
                    id={btn}
                    select={props.select}
                    selected={props.selected}
                    key={btn}/>)}
            </HStack>
        }
            </Flex>
}

export default Header;
