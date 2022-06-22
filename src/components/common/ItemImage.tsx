import React, {FC} from 'react';
import {imageUrl} from "../../context/context";

interface ItemImageProps{
    path : string,
    width ?:string
    alt : string
}

export const ItemImage : FC<ItemImageProps> = ({path,width,alt}) => {
    return <img src={imageUrl(path)} alt={alt} width={width} className='round-corners'/>
}