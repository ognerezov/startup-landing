import {AbsoluteCenter} from "@chakra-ui/react";
import {FC} from "react";

interface NoItemsFoundProps{

}

export const NoItemsFound : FC<NoItemsFoundProps> = ()=>{
    return <AbsoluteCenter>no items found</AbsoluteCenter>
}
