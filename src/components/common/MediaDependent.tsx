import React, {FC, Fragment, ReactNode} from 'react'
import {useMediaQuery} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";

interface MediaDependentProps{
    desktop ?: ReactNode;
    mobile  ?: ReactNode;
}

export const MediaDependent : FC<MediaDependentProps> = ({desktop,mobile}) => {
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    if (!desktop && !mobile){
        return null
    }
    return <Fragment>
        {largeScreen ? desktop : mobile}
    </Fragment>
}
