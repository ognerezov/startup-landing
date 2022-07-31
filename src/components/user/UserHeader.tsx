import React, {FC, useState} from 'react'
import {Center, Text} from "@chakra-ui/react";
import {useIntl} from "react-intl";
import {UserContext} from "../../context/userContext";
import {Alert} from "../common/Alert";
import {NO_AUTH} from "../../model/user";

interface UserHeaderProps{
    textVariant : string
}

export const UserHeader : FC<UserHeaderProps> = ({textVariant})=>{
    const intl = useIntl()
    const [open, setOpen] = useState<boolean>(false)
    return  (
        <UserContext.Consumer>{({auth,setAuth}) => auth.user && auth.user.firstName ?
            <Center onClick={() => setOpen(true)} cursor='pointer'>
                <Text variant={textVariant} px='1.1vmin'>
                    {intl.formatMessage({id: 'Hello'}) + ' ' + auth.user.firstName}
                </Text>
                {open ?
                <Alert
                    title={'Logout'}
                    buttonText={'Logout'}
                    onCancel={()=>setOpen(false)}
                    onOk={()=>{
                        setAuth(NO_AUTH);
                        setOpen(false);
                    }}
                    isOpen={open}/> : null}
            </Center> : null
        }</UserContext.Consumer>
    )
}