import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {EditState, ItemContextService} from "../../context/context";
import {
    Box, Button, Center,
    FormControl, HStack, Select, Spinner, Text,
    useMediaQuery, VStack
} from "@chakra-ui/react";
import {QUERY_SCREEN_SIZE} from "../../pages/About";
import {EditItemRequest, isValid, Item} from "../../model/items";
import {DEFAULT_SPOT} from "../../backend/GeoSearch";
import {InputField} from "../common/InputField";
import {useIntl} from "react-intl";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {getLocation} from "../../services/GeolocationService";
import { Point } from '../../model/geo';
import {Annotation} from "../common/Anotation";
import {fetchAddress} from "../../services/MapboxUtil";
import {FileInput} from "../common/FileInput";
import {TextButton} from "../common/TextButton";
import {goToItem} from "../../config/ServerAddress";

interface ItemCreatorProps{
    context : ItemContextService
    submit :(item : Item | EditItemRequest)=>void
}

export const ItemCreator : FC<ItemCreatorProps> = ({context, submit}) => {
    const mapContainer = useRef<HTMLElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [largeScreen] = useMediaQuery(QUERY_SCREEN_SIZE)
    const intl = useIntl();
    const [item,setItem] = useState<EditItemRequest>(context.editContext.editItem ?
        {...context.editContext.editItem, category : context.editContext.editItem.categoryId}:
        {
        name : '',
        description : '',
        price : 0.0,
        pricePerHour : 0.0,
        pricePerDay : 0.0,
        pricePerWeek : 0.0,
        pricePerMonth : 0.0,
        pricePerYear : 0.0,
        lon : DEFAULT_SPOT.lon,
        lat : DEFAULT_SPOT.lat,
        category : context.editContext.category
    })

    const marker = useRef<mapboxgl.Marker>()
    const recenter= useCallback((point: Point)=> {
        fetchAddress(point)
            .then(address => {
                setItem(item=>({...item,...address, lon : point.lon, lat : point.lat}))
            })
            .catch(()=>{
                setItem(item=>({...item,address : undefined, lon : point.lon, lat : point.lat}))})
        map.current?.setCenter([point.lon, point.lat])
        marker.current && marker.current.remove();
        marker.current = new mapboxgl.Marker()
            .setLngLat([point.lon, point.lat])
            .addTo(map.current!);
    },[])

    const initMap = useCallback((point : Point)=> {
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

        const geoCoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: 'input location',
            mapboxgl: mapboxgl,
            marker: true,
            flyTo : false
        })


        map.current.addControl(new mapboxgl.FullscreenControl());
        map.current.addControl(geoCoder);
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
            })
        );

        map.current.addControl(new mapboxgl.NavigationControl());
        geoCoder.on('result', function(ev) {
            // console.log(ev)
            const point : Point = {
                lat : ev.result.geometry.coordinates[1],
                lon : ev.result.geometry.coordinates[0]
            }
            recenter(point)
        });
    },[recenter]);

    useEffect(() => {
        if (map.current) {
            return;
        }
        initMap({lat : item.lat, lon: item.lon})
        getLocation()
            .then(recenter)
            .catch(()=>{})
    },[initMap, item, recenter]);

    const addressString= useMemo(()=>{
        if(item.address){
            return item.address;
        }

        const lon = (item.lon+'').slice(0,8);
        const lat = (item.lat + '').slice(0,8);
        return lon +', '+lat
    },[item.address, item.lat, item.lon])


    const form = useMemo(()=>{
        switch (context.editContext.state){
            case EditState.Submitting:
                return  <Center w={'100%'} h={'100%'}>
                            <Spinner/>
                        </Center>
            case EditState.Submitted:
                return <Center w={'100%'} h={'100%'} >
                    <VStack w={'80%'}>
                        <Text variant='success' w={'100%'} pb={'8vh'} textAlign={'center'}>
                            {intl.formatMessage({id: 'Create.item.success'})}
                        </Text>
                        <HStack w={'100%'} justifyContent={'center'}>
                        <TextButton onClick={()=>{
                            goToItem(context.editContext.id!)
                        }} id={'Create.item.view'} px={'1.1vmin'} variant = 'medium_solid'/>
                        <TextButton onClick={()=>{
                            setItem({...item, file : undefined})
                            context.setEditContext({...context.editContext, state : EditState.Started})
                        }} id={'Create.item.another'} px={'1.1vmin'} variant = 'medium_solid'/>
                        </HStack>
                    </VStack>
                </Center>
            case EditState.Error:
                return  <Center w={'100%'} h={'100%'}>
                            <VStack w={'80%'}>
                                <Text variant='error' >
                                    {intl.formatMessage({id: 'Create.item.error'})}
                                </Text>
                                <TextButton onClick={()=>{
                                        context.setEditContext({...context.editContext, state : EditState.Started})
                                }} id={'Back'} px={'1.1vmin'} variant = 'medium'/>
                            </VStack>
                        </Center>
            case EditState.Started:
            default:
                return <FormControl  maxHeight={'200vh'} pb={'5vh'}>
                    <Select placeholder='Select category'
                            value={item.category}
                            onChange={ event =>{
                                console.log(event.target.value)
                                setItem({...item, category : +event.target.value})
                            }}
                    >
                        {context.categories.map(category=>(
                            <option value={category.id} key={category.id}>
                                    {intl.formatMessage({id: `Category.${category.id}`})}
                            </option>
                        ))}
                    </Select>
                    <FileInput
                                id={'img'}
                               label={'Create.item.image'}
                               onChange={ file =>
                                   setItem({...item,file})
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
                                step={1.0}
                                onChange={ val =>
                                    setItem({...item,pricePerHour : +val})
                                } />
                    <InputField id={'p.day'}
                                value={item.pricePerDay}
                                label={'Price.day'}
                                type={'number'}
                                step={1.0}
                                onChange={ val =>
                                    setItem({...item,pricePerDay : +val})
                                } />
                    <InputField id={'p.week'}
                                value={item.pricePerWeek}
                                label={'Price.week'}
                                type={'number'}
                                step={1.0}
                                onChange={ val =>
                                    setItem({...item,pricePerWeek : +val})
                                } />
                    <InputField id={'p.month'}
                                value={item.pricePerMonth}
                                label={'Price.month'}
                                type={'number'}
                                step={1.0}
                                onChange={ val =>
                                    setItem({...item,pricePerMonth : +val})
                                } />
                    <InputField id={'cost'}
                                value={item.price}
                                label={'Create.item.cost'}
                                type={'number'}
                                step={1.0}
                                onChange={ val =>
                                    setItem({...item,price : +val})
                                } />
                    <Center>
                        <Button
                            disabled={!isValid(item)}
                            className='bordered' w='60%' variant='ghost'  onClick={()=>submit(item)} id={'Submit'} >
                            {intl.formatMessage({id :'Submit'})}</Button>
                    </Center>
                </FormControl>
        }

    },[context, intl, item, submit])

    return  <Box w={'100%'} h={'100%'}>
        <Annotation w={largeScreen ? '17vw' :'50vw'} h={'8vh'} left={largeScreen ? '10vw' :'0.8vw'} top={'21.7vh'} backgroundColor={'white'}>
            <VStack>
                <Center>
                    <Text variant ='annotation_caption'>
                        {intl.formatMessage({id: 'Create.item.location'})}
                    </Text>
                </Center>
                <Center>
                    <Text variant ='tiny'>
                        {addressString}
                    </Text>
                </Center>
            </VStack>
        </Annotation>
        <div>
            <div ref={mapContainer as React.RefObject<HTMLDivElement>} className={'map-container-mini-portrait'} />
        </div>
        <Box    overflowY={'auto'}
                overflowX={'hidden'}
                maxHeight={'64vh'}
                height = {'64vh'}
                width={'100%'}
                px = {largeScreen ? '15vw' : '1vw'}
                py={'0.5vh'}
        >
                {form}
                </Box>
</Box>
}
