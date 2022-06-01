import React, {FC} from 'react'
import {Box, Center, Text} from "@chakra-ui/react";
import {useIntl} from "react-intl";
import photoCat from '../images/categories/photo_cat.png'
import dronesCat from '../images/categories/drones.png'
import sportsCat from '../images/categories/sports.png'
import musicCat from '../images/categories/music.png'
import hikingCat from '../images/categories/hiking.png'
import toolsCat from '../images/categories/tools.png'
import gamingCat from '../images/categories/gaming.png'
import kidsCat from '../images/categories/kids.png'
import eventsCat from '../images/categories/events.png'
import campingCat from '../images/categories/camping.png'

interface ButtonCardProps{
    id : string
    onSelect : (id : string)=>void
    size : string
}
export interface Dict {
    [key: string] : string
}
export const IMAGES : Dict= {
    photo : photoCat,
    drones : dronesCat,
    sports : sportsCat,
    music : musicCat,
    hiking : hikingCat,
    tools : toolsCat,
    gaming : gamingCat,
    kids : kidsCat,
    events : eventsCat,
    camping : campingCat
}


export const ButtonCard : FC<ButtonCardProps> = props => {
    const intl = useIntl();
    const text = intl.formatMessage({id: `Category.${props.id}`});
    return <Box w={props.size} h={props.size}
                position='relative'
                boxShadow='0.5vmin 0.5vmin 1vmin #3D3D3D'
                onClick={()=>{props.onSelect(props.id)}}
                className='round-corners'
                cursor='pointer'>
        <img src={IMAGES[props.id]} className='round-corners' height='100%' alt={text}/>
        <Box backgroundColor='white'
             position='absolute'
             borderRadius='2vmin 2vmin 0px 0px' w='100%' h='18%' top='0'>
            <Center width='100%' height='100%'>
                <Text align='center' variant='caption_b' width='80%'>
                    {intl.formatMessage({id: `Category.${props.id}`})}
                </Text>
            </Center>
        </Box>
    </Box>
}