import React, {FC, useEffect} from 'react';
import {UserContext} from "../../context/userContext";
import {InputField} from "../common/InputField";
import {Button, Center, FormControl, Spinner, Text} from "@chakra-ui/react";
import {useValidState} from "../../hooks/validState";
import {validateEmail} from "../../services/Validators";
import {DialogFrame} from "../../dialogs/DialogFrame";
import {useIntl} from "react-intl";
import {FetchState, getErrorMessage, useFetchState} from "../../hooks/fetchState";
import {BasicResponse, EmailRequest, EMPTY_RESPONSE} from "../../model/api/userRequests";

interface EmailAuthorizerProps {
    quit : ()=>void
}

export const EmailAuthorizer : FC<EmailAuthorizerProps> = ({quit}) => {
    const [email,error, setEmail] = useValidState<string>('',validateEmail)
    const [emailLoginResult,emailLoginFetchState,emailLoginError,submitEmail] = useFetchState<BasicResponse,EmailRequest>('user/login','POST',EMPTY_RESPONSE)
    const intl = useIntl();
    function setEmailValue(val : string|number){
        setEmail(val+'')
    }
    useEffect(()=>{

    },[emailLoginResult,emailLoginFetchState,emailLoginError])

    function getOtpValidationForm(){
        return <Center>
            input otp
        </Center>
    }

    function getFormControl() {
        switch (emailLoginFetchState) {
            case FetchState.InProgress:
                return <Center w={'100%'} h={'100%'}>
                        <Spinner/>
                    </Center>
            case FetchState.Finished:
                return emailLoginError === 200 ? getOtpValidationForm() :
                    <Center w={'100%'} h={'100%'}>
                        <Text variant='error'>
                            {intl.formatMessage({id: getErrorMessage(emailLoginError)})}
                        </Text>
                    </Center>
            case FetchState.NotStarted:
            default:
                return <FormControl maxHeight={'66vh'} p={'5vh'}>
                    <InputField id={'email'}
                                value={email}
                                label={'Email'}
                                type={'email'}
                                onChange={setEmailValue}/>
                    <Center>
                        {error ?
                            <Text variant='error'>
                                {intl.formatMessage({id: error + ''})}
                            </Text> :
                            <Button
                                disabled={!!error || !email}
                                className='bordered' w='60%' variant='ghost'
                                onClick={() => {
                                    submitEmail({email})
                                }}
                                id={'Submit'}>
                                {intl.formatMessage({id: 'Submit'})}</Button>
                        }
                    </Center>
                </FormControl>
        }
    }

    function getTitle() {
        return 'Login.email';
    }

    return <UserContext.Consumer>
        {({auth,setAuth})=><DialogFrame
            title={intl.formatMessage({id: getTitle()})}
            isOpen={true} onClose={quit} w={'54vw'}>
            {getFormControl()}
        </DialogFrame>}
    </UserContext.Consumer>
}