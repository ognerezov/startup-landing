import React, {FC} from 'react';
import {Box} from "@chakra-ui/react";

interface AnnotationProps{
    children?: React.ReactNode;
    w : string
    h : string
    left : string
    top : string
    backgroundColor ?:string
}

export const Annotation : FC<AnnotationProps> = ({children,w,h,left,top,backgroundColor}) => {
    return <Box
            px={'0.2vw'}
            w={w} h={h} left={left} top={top}
            backgroundColor={backgroundColor}
            position={'fixed'}
            zIndex={10}
            className ={'small-corners bordered-blue'}
    >
        {children}
    </Box>
}