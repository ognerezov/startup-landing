import React, {FC, useEffect, useRef, useState} from 'react'
import mapboxgl, {GeoJSONSource, MapboxGeoJSONFeature} from 'mapbox-gl';
import {DEFAULT_SPOT} from "../../backend/GeoSearch";
import {loadImages} from "../../services/MapboxUtil";
import {IItemContext} from "../../context/context";
import {Item} from "../../model/items";
import {goToItem} from "../../config/ServerAddress"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoicG9sYXJvc28iLCJhIjoiY2w0NWx0OHA3MDI3bTNrbjZyeWIxcG95aSJ9.XJVCOv41BrAzsKm9Ye2ygQ';

interface MapViewProps extends IItemContext{
    className ?: string
    selectItem ?: (item : Item) => void
    highLightItem ?: (id : number|undefined) => void
}

export const MapView :FC<MapViewProps> = ({items,images, className,highLightItem}) => {
    const mapContainer = useRef<HTMLElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [lng, setLng] = useState<number>(DEFAULT_SPOT.lon);
    const [lat, setLat] = useState<number>(DEFAULT_SPOT.lat);
    const [zoom, setZoom] = useState<number>(13);

    function onSelectFeatures(features : MapboxGeoJSONFeature[]){
        for(const feature of features){
            if(feature.properties && feature.properties['type'] === 'item'){
                feature.properties['id'] && goToItem(feature.properties['id'])
            }
        }
    }


    useEffect(()=>{
        if(!items || !images || !map.current || Object.keys(items).length === 0){
            return
        }
        console.log(items)
        loadImages(map.current, images, loaded => {
            map.current!.on('load', () => {
                const features: GeoJSON.Feature<GeoJSON.Geometry>[] = [];
                console.log('setting images')
                for (const key in loaded) {
                    if (!loaded[key] || map.current!.hasImage(key)) continue;
                    map.current!.addImage(key, loaded[key]!, {
                        pixelRatio: 2
                    });
                    console.log('adding features')
                    const item = items[key];
                    features.push(
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [item.lon, item.lat]
                            },
                            'properties': {
                                'image-name': key,
                                'name': (items[key].pricePerDay / 100) + '€/day',
                                'id': key,
                                'type': 'item',
                                'size': 0.25,
                                'size2': 0.3
                            }
                        }
                    )
                }
                console.log(features.length)
                updateItemLayer(map.current!,features)
            })

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[items])

    function updateItemLayer(map: mapboxgl.Map,features: GeoJSON.Feature<GeoJSON.Geometry>[] ){
        // console.log("update item layers");
        // console.log(items)
        // console.log(features);
        (map.getSource('points') as GeoJSONSource).setData({
            'type': 'FeatureCollection',
            features
        })
    }

    function onItemMouseLeave(){
        highLightItem && highLightItem(undefined);
        updateTextLayer(map.current!,[]);
    }

    function onItemMouseOver(features : MapboxGeoJSONFeature[]){
        for(const feature of features){
            if(feature.properties && feature.properties['type'] === 'item' && feature.properties['id']){
                const id : number = +feature.properties['id'];
                const item = items![id];
                const f :  GeoJSON.Feature<GeoJSON.Geometry>[] = [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [item.lon, item.lat]
                        },
                        'properties': {
                            'image-name': id,
                            'name': (item.pricePerDay / 100) + '€/day',
                            'id': id,
                            'type': 'item',
                            'size': 0.25,
                            'size2': 0.3
                        }
                    }
                ]
                highLightItem && highLightItem(id);
                updateTextLayer(map.current!,f);
                return;
            }
        }
    }

    function updateTextLayer(map: mapboxgl.Map,features: GeoJSON.Feature<GeoJSON.Geometry>[] ){
        //console.log("update layers with features");
        (map.getSource('texts') as GeoJSONSource).setData({
            'type': 'FeatureCollection',
            features
        })
    }

    function initDataLayers(map: mapboxgl.Map){
        map.addSource('points', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                features : []
            }
        });

        map.addSource('texts', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                features : []
            }
        });

        map.addLayer({
            'id': 'items',
            'type': 'symbol',
            'source': 'points',
            'layout': {
                'icon-image': ['get', 'image-name'],
                'icon-size': ['get', 'size'],
                'icon-allow-overlap': true,
                'text-allow-overlap': true
            }
        });

        map.addLayer({
            'id': 'items_text',
            'type': 'symbol',
            'source': 'texts',
            'layout': {
                'text-field': ['get', 'name'],
                'text-anchor': 'bottom',
                'text-offset': [0, 2.5],
                'icon-text-fit': 'both',
                // 'icon-image': ['get', 'image-name'],
                // 'icon-size': ['get', 'size'],
                // 'icon-allow-overlap': true,
                'text-allow-overlap': true
            }
        });
    }

    useEffect(() => {
        if (map.current) {
            return;
        }
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('load',()=>{
            console.log('map init data layers')
            initDataLayers(map.current!);
        })

        map.current.on('click', (event) => {
            const data : MapboxGeoJSONFeature[] = map.current!.queryRenderedFeatures(event.point, {
                layers: ['items']
            });
            onSelectFeatures(data)
        });

        map.current.on('mouseenter', 'items', (event) => {
            const data : MapboxGeoJSONFeature[] = map.current!.queryRenderedFeatures(event.point, {
                layers: ['items']
            });
            onItemMouseOver(data);
        });

        map.current.on('mouseleave', 'items', (event) => {
            const data : MapboxGeoJSONFeature[] = map.current!.queryRenderedFeatures(event.point, {
                layers: ['items']
            });
            if(data.length === 0) {
                onItemMouseLeave();
            } else {
                onItemMouseOver(data);
            }
        });

        map.current.on('move', () => {
            setLng(+map.current!.getCenter().lng.toFixed(4));
            setLat(+map.current!.getCenter().lat.toFixed(4));
            setZoom(+map.current!.getZoom().toFixed(2));

        });
    });
    //console.log('render map')
    return <div><div ref={mapContainer as React.RefObject<HTMLDivElement>} className={className} /></div>
}