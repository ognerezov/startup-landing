import React, {FC} from 'react';

interface ItemImageProps{
    path : string,
    width ?:string
    alt : string
}

export const IMAGE_BASE_PATH = 'https://d2g79p4t72w59h.cloudfront.net/'

export const ItemImage : FC<ItemImageProps> = ({path,width,alt}) => {
    return <img src={IMAGE_BASE_PATH + path} alt={alt} width={width} className='round-corners'/>
}