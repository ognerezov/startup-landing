import React, {FC, ReactNode, useEffect} from 'react';
import {AuthState, UserContextService} from "../../context/userContext";
import {useIntl} from "react-intl";
import {bearer, FetchState, getErrorMessage, useFetchState} from "../../hooks/fetchState";
import {DialogFrame} from "../../dialogs/DialogFrame";
import {Button, Center, FormControl, Spinner, Text} from "@chakra-ui/react";
import {ANONYMOUS, Auth, User} from "../../model/user";
import {InputField} from "../common/InputField";
import {useValidState} from "../../hooks/validState";
import {validateUser} from "../../services/Validators";

interface ProfileEditorProps extends UserContextService{
    quit : ()=>void
}

export const ProfileEditor : FC<ProfileEditorProps> = ({quit, auth,setAuth}) => {
    const intl = useIntl();
    const [user, userError, setUser] = useValidState<User>(auth.user || ANONYMOUS, validateUser)
    const [result,fetchState,submitError,submitUser] = useFetchState<Auth,User>('customer','PUT',auth)

    useEffect(()=>{
        if(result === auth){
            return
        }
        setAuth({...result, state : AuthState.Authorized})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[result])

    if(!auth.user){
        return null
    }

    function getContent() : ReactNode{
        switch (fetchState) {
            case FetchState.InProgress:
                return <Center w={'100%'} h={'100%'}>
                    <Spinner/>
                </Center>
            case FetchState.Finished:
                return submitError === 200 ? null :
                    <Center w={'100%'} h={'100%'}>
                        <Text variant='error'>
                            {intl.formatMessage({id: getErrorMessage(submitError)})}
                        </Text>
                    </Center>
            case FetchState.NotStarted:
            default:
                return getFormControl()
        }
    }

    function getFormControl() : ReactNode{
        return <FormControl maxHeight={'200vh'} pb={'5vh'}>
            <InputField id={'phone'}
                        value={user.phone ? user.phone : ''}
                        label={'Profile.phone'}
                        onChange={ val =>
                            setUser({...user,phone : val + ''})
                        } />
            <InputField id={'email'}
                        value={user.email}
                        label={'Profile.email'}
                        type={'email'}
                        onChange={ email =>
                            setUser({...user,email : email + ''})
                        } />
            <InputField id={'firstName'}
                        value={user.firstName}
                        label={'Profile.firstName'}
                        onChange={ val =>
                            setUser({...user,firstName : val + ''})
                        } />
            <InputField id={'lastName'}
                        value={user.lastName ? user.lastName : ''}
                        label={'Profile.lastName'}
                        onChange={ val =>
                            setUser({...user,lastName : val + ''})
                        } />
            <Center>
                {userError ?
                    <Text variant='error'>
                        {intl.formatMessage({id: userError + ''})}
                    </Text> :
                    <Button
                        disabled={!!userError}
                        className='bordered' w='60%' variant='ghost'
                        onClick={() => {
                            submitUser(user,bearer(auth.token!))
                        }}
                        id={'Submit'}>
                        {intl.formatMessage({id: 'Submit'})}</Button>
                }
            </Center>
        </FormControl>
    }

    function getTitle() {
        return 'Profile.complete';
    }

    return <DialogFrame
        title={intl.formatMessage({id: getTitle()})}
        isOpen={true} onClose={quit} w={'54vw'}>
        {getContent()}
    </DialogFrame>
}