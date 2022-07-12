import React, {FC, ReactNode, useEffect} from 'react';
import {AuthState, UserContext, UserContextService} from "../../context/userContext";
import {InputField} from "../common/InputField";
import {Button, Center, FormControl, Spinner, Text} from "@chakra-ui/react";
import {useValidState} from "../../hooks/validState";
import {validateEmail, validateOTP} from "../../services/Validators";
import {DialogFrame} from "../../dialogs/DialogFrame";
import {useIntl} from "react-intl";
import {FetchState, getErrorMessage, useFetchState} from "../../hooks/fetchState";
import {
    BasicResponse,
    EmailRequest,
    EMPTY_RESPONSE,
    EMPTY_VALUE_RESPONSE,
    ValueResponse
} from "../../model/api/userRequests";
import {User} from "../../model/user";

interface EmailAuthorizerProps extends UserContextService{
    quit : ()=>void
}

export const EmailAuthorizer : FC<EmailAuthorizerProps> = ({quit,auth,setAuth}) => {
    const [email,error, setEmail] = useValidState<string>('',validateEmail)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [emailLoginResult,emailLoginFetchState,emailLoginError,submitEmail] = useFetchState<BasicResponse,EmailRequest>('user/login','POST',EMPTY_RESPONSE)
    const [otp,otpError, setOtp] = useValidState<number|string>('',validateOTP);
    const [otpResult,otpFetchState,otpSubmitError,submitOtp] = useFetchState<ValueResponse,string>('user/otp/','GET',EMPTY_VALUE_RESPONSE)
    const [user,userFetchState,tokenSubmitError,submitToken] = useFetchState<User | undefined,string>('customer','GET',undefined)

    const intl = useIntl();
    function setEmailValue(val : string|number){
        setEmail(val+'')
    }
    useEffect(()=>{
        setAuth({...auth,token : otpResult.value, state : AuthState.RequestingAuthorization})
        submitToken("","Bearer " + otpResult.value)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[otpResult])

    useEffect(()=>{
        setAuth({...auth,user, state : AuthState.Authorized})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])

    function getOtpSuccessForm() : ReactNode{
        switch (userFetchState) {
            case FetchState.NotStarted:
            default:
            case FetchState.InProgress:
                return <Center w={'100%'} h={'100%'}>
                    <Spinner/>
                </Center>
            case FetchState.Finished:
                return otpSubmitError === 200 ? null :
                    <Center w={'100%'} h={'100%'}>
                        <Text variant='error'>
                            {intl.formatMessage({id: getErrorMessage(tokenSubmitError)})}
                        </Text>
                    </Center>
        }
    }

    function getOtpValidationForm() : ReactNode{
        switch (otpFetchState) {
            case FetchState.InProgress:
                return <Center w={'100%'} h={'100%'}>
                            <Spinner/>
                        </Center>
            case FetchState.Finished:
                return otpSubmitError === 200 ? getOtpSuccessForm() :
                    <Center w={'100%'} h={'100%'}>
                        <Text variant='error'>
                            {intl.formatMessage({id: getErrorMessage(otpSubmitError)})}
                        </Text>
                    </Center>
            case FetchState.NotStarted:
            default:
                return <FormControl maxHeight={'66vh'} p={'5vh'}>
                    <InputField id={'otp'}
                                value={otp}
                                label={'Otp'}
                                type={"number"}
                                onChange={setOtp}/>
                    <Center>
                        {otpError ?
                            <Text variant='error'>
                                {intl.formatMessage({id: otpError + ''})}
                            </Text> :
                            <Button
                                disabled={!!otpError || !otp}
                                className='bordered' w='60%' variant='ghost'
                                onClick={() => {
                                    submitOtp(otp + '')
                                }}
                                id={'Submit'}>
                                {intl.formatMessage({id: 'Submit'})}</Button>
                        }
                    </Center>
                </FormControl>
        }
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
        return emailLoginFetchState !== FetchState.Finished ? 'Login.email' :
            (otpFetchState !== FetchState.Finished ? 'Login.input.otp' : 'Login.otp.success');
    }

    return <UserContext.Consumer>
        {({auth,setAuth})=><DialogFrame
            title={intl.formatMessage({id: getTitle()})}
            isOpen={true} onClose={quit} w={'54vw'}>
            {getFormControl()}
        </DialogFrame>}
    </UserContext.Consumer>
}