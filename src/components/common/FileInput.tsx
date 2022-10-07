import React, {FC, useState} from 'react'
import {useIntl} from "react-intl";
import {
    FormLabel, HStack, Input
} from "@chakra-ui/react";

interface FileInputProps {
    id : string
    label : string
    onChange :(val ?: File) =>void
}

export const FileInput : FC<FileInputProps> = ({id, onChange, label}) => {
    const intl = useIntl();
    const [img, setImg] = useState<string|undefined>();
    return <div>
        <FormLabel variant={'medium'} htmlFor={id}>{intl.formatMessage({id :label})}</FormLabel>
        <HStack w={'100%'}>
            <Input
                w = '50%'
                color='blue.300'
                fontWeight={'200'}
                size="md"
                variant={'flushed'}
                type={'file'}
                accept={'image/png, image/jpg, image/bmp, image/gif, image/svg+xml, image/tiff'}
                multiple={false}
                id={id}
                onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                    if (e.currentTarget.files && e.currentTarget.files.length > 0){
                        onChange(e.currentTarget.files[0]);
                        setImg(URL.createObjectURL(e.currentTarget.files[0]));
                    } else {
                        onChange(undefined)
                        setImg(undefined)
                    }
                }}
            />
            {img && <img src={img} alt="your item" width={'50%'}/> }
        </HStack>
    </div>
}
