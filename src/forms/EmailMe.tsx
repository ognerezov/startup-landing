import React, {FC, useEffect, useState} from "react";
import {
    Button,
    FormControl,
    Text,
    FormLabel,
    HStack,
    Input,
    VStack,
    Textarea,
    Box,
    Spinner,
    Center
} from "@chakra-ui/react";
import {isEmail, isPhone} from "../services/Validators";
import {sendEmail, StatusCodeHolder} from "../services/LambdaService";
import {useIntl} from "react-intl";
import {en} from "../assets/languages/en";

interface EmailMeProps{
    subject : string
    onClose : ()=>void
    onSuccess : ()=>void
    width ?: string
    height ?: string
    textNotRequired ?:boolean
}

type SendState = 'sending' | 'error' | 'success' | 'not started';

interface EmailMeState {
    from : string
    body : string
    sendState : SendState
}

const NOT_STARTED = 'not started';
const SENDING = 'sending';
const ERROR = 'error';
const SUCCESS = 'success';

export const EmailMe : FC<EmailMeProps> = props => {
    const [state, setState] = useState<EmailMeState>({from :'', body : '', sendState : NOT_STARTED});
    const intl = useIntl();

    useEffect(()=>{
        function onKeyDown(e : KeyboardEvent){
            if (state.sendState === ERROR){
                props.onClose();
                return;
            }
            if (e.key === "Enter"){
                if (!isFormValid()){
                    return;
                }
                if (state.sendState === NOT_STARTED){
                    submit();
                    return;
                }

                if (state.sendState === SUCCESS){
                    props.onSuccess();
                }
                return;
            }
            if (e.key === "Escape"){
                if (state.sendState === SUCCESS){
                    props.onSuccess();
                    return;
                }
                props.onClose();
            }
        }
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener( 'keydown', onKeyDown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    function isContactValid(){
        return isEmail(state.from) || isPhone(state.from)
    }

    function isFormValid(){
        return (state.body || props.textNotRequired) && isContactValid()
    }

    function setSendState(sendState : SendState){
        setState({...state,sendState})
    }

    async function submit(){
        setSendState(SENDING)
        try{
            const resString = await sendEmail({from : state.from!, subject : props.subject,body : state.body!});
            const result = JSON.parse(resString as string) as StatusCodeHolder;
            setSendState(result.statusCode === 200 ? SUCCESS : ERROR)
        } catch (e) {
            setSendState(ERROR)
        }
    }

    return (
        <Box
            width = {props.width}
            height = {props.height}
        >
        <VStack
            spacing={4}
            align='stretch'
        >
            { en[props.subject] ?
                <Text variant='header'>
                    {intl.formatMessage({id: props.subject})}
                </Text> : null
            }
            { state.sendState === NOT_STARTED ?
                <div>
                    <FormControl>
                        <FormLabel htmlFor='email'>{intl.formatMessage({id :'Email.email'})}</FormLabel>
                        <Input
                            value={state.from}
                            autoFocus={true}
                            id='email'
                            onChange={event => setState({...state,from : event.currentTarget.value})}
                        />
                        {isContactValid() ? null :
                            <Text variant='error'>{intl.formatMessage({id: 'Email.description'})}</Text>
                        }
                        <FormLabel htmlFor='msgBody'>{intl.formatMessage({id :'Email.text'})}</FormLabel>
                        <Textarea
                                  value = {state.body}
                                  rows={5}
                                  id ='msgBody'
                                  onChange={event => setState({...state,body : event.currentTarget.value})}
                                  borderColor='blue.100'
                                  focusBorderColor = 'fuchsia.100'
                                  color='white.700'
                                  resize='vertical'
                        >

                        </Textarea>
                    </FormControl>
                    <HStack
                        spacing={4}
                        justifyContent='end'
                        marginTop='10px'
                        >
                        <Button
                            variant='solid'
                            onClick={props.onClose}
                        >
                            {intl.formatMessage({id :'Cancel'})}
                        </Button>
                        <Button
                            variant='solid'
                            disabled={!isFormValid()}
                            onClick={submit}
                        >
                            {intl.formatMessage({id :'Submit'})}
                        </Button>
                    </HStack>
                </div>
                : null}
            { state.sendState === SENDING ?
                <Center w='100%'>
                    <Spinner />
                </Center> :
                null
            }
            {
                state.sendState === SUCCESS ?
                    <VStack
                        spacing={4}
                        align='stretch'
                     >
                    <Text variant='caption'>
                        {intl.formatMessage({id: 'Email.sent'})}
                    </Text>
                    <HStack
                        spacing={4}
                        justifyContent='end'
                    >
                    <Button
                        variant='solid'
                        onClick={props.onSuccess}
                    >
                    {intl.formatMessage({id :'Back'})}
                        </Button>
                        </HStack>
                    </VStack> : null
            }
            {
                state.sendState === ERROR ?
                    <VStack
                        spacing={4}
                        align='stretch'
                    >
                        <Text variant='error'>
                            {intl.formatMessage({id: 'Email.error'})}
                        </Text>
                        <HStack
                            spacing={4}
                            justifyContent='end'
                        >
                            <Button
                                variant='solid'
                                onClick={props.onClose}
                            >
                                {intl.formatMessage({id :'Back'})}
                            </Button>
                        </HStack>
                    </VStack>  : null
            }

        </VStack>
        </Box>)
}
