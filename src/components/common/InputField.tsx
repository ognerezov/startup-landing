import React, {FC, HTMLInputTypeAttribute} from 'react'
import {
    FormLabel,
    Input, NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import {useIntl} from "react-intl";

interface InputFieldProps {
    id : string
    value : string |number| undefined
    label : string
    onChange :(val : string|number) =>void
    autoFocus ?: boolean
    type ?: HTMLInputTypeAttribute
    step ?:number
}

export const InputField : FC<InputFieldProps> = ({id, onChange,value,autoFocus, type, label, step}) => {
    const intl = useIntl();
    return <div>
        <FormLabel variant={'medium'} htmlFor={id}>{intl.formatMessage({id :label})}</FormLabel>
        {type ==='number' ?
            <NumberInput
                        value={value as number}
                        variant={'flushed'} size="md" step={step} defaultValue={0} min={0}
                         onChange={(valueAsString, valueAsNumber) => onChange(valueAsNumber)}
            >
                <NumberInputField color='blue.300'  fontWeight={'200'}/>
                <NumberInputStepper color='blue.300'>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput> :
            <Input
                color='blue.300'
                fontWeight={'200'}
                size="md"
                variant={'flushed'}
                type = {type}
                value={value}
                autoFocus = {autoFocus}
                id={id}
                step={step}
                onChange={event => onChange(event.currentTarget.value)}
            />
        }

    </div>
}
