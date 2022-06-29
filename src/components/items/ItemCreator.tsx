import React, {FC, useEffect, useRef, useState} from 'react'
import { ItemContextService} from "../../context/context";
import {
    Box, Button, Center,
    FormControl,
    useMediaQuery
} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {AddItemRequest} from "../../model/items";
import {DEFAULT_SPOT} from "../../backend/GeoSearch";
import {InputField} from "../common/InputField";
import {useIntl} from "react-intl";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {getLocation} from "../../services/GeolocationService";
import { Point } from '../../model/geo';
import {TextButton} from "../common/TextButton";

interface ItemCreatorProps{
    context : ItemContextService
}

export const ItemCreator : FC<ItemCreatorProps> = ({context}) => {
    const mapContainer = useRef<HTMLElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const intl = useIntl();
    const [item,setItem] = useState<AddItemRequest>({
        name : '',
        email : '',
        firstName : '',
        lastName : '',
        description : '',
        pricePerHour : 0.0,
        pricePerDay : 0.0,
        pricePerWeek : 0.0,
        pricePerMonth : 0.0,
        lon : DEFAULT_SPOT.lon,
        lat : DEFAULT_SPOT.lat,
    })

    function initMap(point : Point) {
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [point.lon, point.lat],
            zoom: 13
        });

        map.current.on('load', () => {
            console.log('map init data layers')
        })
        map.current.on('click', (event) => {
            recenter({
                lat : event.lngLat.lat,
                lon : event.lngLat.lng
            })
        });

        map.current.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                placeholder: 'input location',
                marker: false,
            })
        );
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
            })
        );
        map.current.addControl(new mapboxgl.FullscreenControl());
        map.current.addControl(new mapboxgl.NavigationControl());
    }
    let marker :mapboxgl.Marker;
    function recenter(point: Point) {
        setItem({...item, lat : point.lat, lon : point.lon})
        map.current?.setCenter([point.lon, point.lat])
        marker && marker.remove();
        marker = new mapboxgl.Marker()
            .setLngLat([point.lon, point.lat])
            .addTo(map.current!);
    }

    useEffect(() => {
        if (map.current) {
            return;
        }
        initMap(DEFAULT_SPOT)
        getLocation()
            .then(recenter)
    });

    return  <Box w={'100%'} h={'100%'}>

                <div>
                    <div ref={mapContainer as React.RefObject<HTMLDivElement>} className={'map-container-mini-portrait'} />
                </div>
        <Box   overflowY={'auto'}
                overflowX={'hidden'}
                maxHeight={'64vh'}
                width={'100%'}
                px = {largeScreen ? '15vw' : '1vw'}
                py={'0.5vh'}>
                    <FormControl  maxHeight={'120vh'} h={'120vh'}>
                        <InputField id={'email'}
                                    value={item.email}
                                    label={'Create.item.email'}
                                    type={'email'}
                                    onChange={ email =>
                            setItem({...item,email : email + ''})
                        } />
                        <InputField id={'firstName'}
                                    value={item.firstName}
                                    label={'Create.item.firstName'}
                                    onChange={ val =>
                                        setItem({...item,firstName : val + ''})
                                    } />
                        <InputField id={'lastName'}
                                    value={item.lastName}
                                    label={'Create.item.lastName'}
                                    onChange={ val =>
                                        setItem({...item,lastName : val + ''})
                                    } />
                        <InputField id={'name'}
                                    value={item.name}
                                    label={'Create.item.name'}
                                    onChange={ val =>
                                        setItem({...item,name : val + ''})
                                    } />
                        <InputField id={'description'}
                                    value={item.description}
                                    label={'Create.item.description'}
                                    onChange={ val =>
                                        setItem({...item,description : val + ''})
                                    } />
                        <InputField id={'p.hour'}
                                    value={item.pricePerHour}
                                    label={'Price.hour'}
                                    type={'number'}
                                    step={0.01}
                                    onChange={ val =>
                                        setItem({...item,pricePerHour : +val})
                                    } />
                        <InputField id={'p.day'}
                                    value={item.pricePerDay}
                                    label={'Price.day'}
                                    type={'number'}
                                    step={0.01}
                                    onChange={ val =>
                                        setItem({...item,pricePerDay : +val})
                                    } />
                        <InputField id={'p.week'}
                                    value={item.pricePerWeek}
                                    label={'Price.week'}
                                    type={'number'}
                                    step={0.01}
                                    onChange={ val =>
                                        setItem({...item,pricePerWeek : +val})
                                    } />
                        <InputField id={'p.month'}
                                    value={item.pricePerMonth}
                                    label={'Price.month'}
                                    type={'number'}
                                    step={0.01}
                                    onChange={ val =>
                                        setItem({...item,pricePerMonth : +val})
                                    } />
                        <Center>
                            <Button className='bordered' w='60%' variant='ghost'  onClick={()=>context.editContext.submit(item)} id={'Submit'} >
                                {intl.formatMessage({id :'Submit'})}</Button>
                        </Center>
                    </FormControl>
                </Box>
</Box>
}