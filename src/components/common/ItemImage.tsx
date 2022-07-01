import React, {FC} from 'react';
import {imageUrl} from "../../context/context";

interface ItemImageProps{
    path : string,
    width ?:string
    alt : string
}
export const ItemImage : FC<ItemImageProps> = ({path,width,alt}) => {
    return <img
        src={imageUrl(path)}
        onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="https://d2g79p4t72w59h.cloudfront.net/0/default.jpg";
        }}
        alt={alt} width={width} className='round-corners'/>
}