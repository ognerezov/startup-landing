import React, {FC, useEffect, useMemo, useRef, useState} from 'react'
import mapboxgl, {GeoJSONSource, MapboxGeoJSONFeature} from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {DEFAULT_SPOT} from "../../backend/GeoSearch";
import {ACCESS_TOKEN, Images, loadImages} from "../../services/MapboxUtil";
import {IItemContext} from "../../context/context";
import {Item} from "../../model/items";
import {goToItem} from "../../config/ServerAddress";
import {Point} from "../../model/geo"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = ACCESS_TOKEN;

interface MapViewProps extends IItemContext{
    className ?: string
    selectItem ?: (item : Item) => void
    highLightItem ?: (id : number|undefined) => void
    point ?: Point
}

export const MapView :FC<MapViewProps> = ({items,images, className,highLightItem, point}) => {
    const mapContainer = useRef<HTMLElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [lng, setLng] = useState<number>(point ? point.lon : DEFAULT_SPOT.lon);
    const [lat, setLat] = useState<number>(point ? point.lat : DEFAULT_SPOT.lat);
    const [zoom, setZoom] = useState<number>(13);
    const [areImagesLoading, setImagesLoading] = useState<boolean>(false);
    const [mapWasLoaded, setMapWasLoaded] = useState<boolean>(false);

    const onSelectFeatures =useMemo(()=>( function (features : MapboxGeoJSONFeature[]){
        for(const feature of features){
            if(feature.properties && feature.properties['type'] === 'item'){
                feature.properties['id'] && goToItem(feature.properties['id'])
            }
        }
    }),[])

    const updateItemLayer =useMemo(()=>( function (map: mapboxgl.Map,features: GeoJSON.Feature<GeoJSON.Geometry>[] ){
        (map.getSource('points') as GeoJSONSource).setData({
            'type': 'FeatureCollection',
            features
        })
    }),[])

    const onImagesLoaded = useMemo(()=>(function (loaded: Images) {
        const features: GeoJSON.Feature<GeoJSON.Geometry>[] = [];
        console.log('setting images')
        for (const key in loaded) {
            if (!loaded[key] || map.current!.hasImage(key)) continue;
            map.current!.addImage(key, loaded[key]!, {
                pixelRatio: 2
            });
            console.log('adding features')
            const item = items![key];
            features.push(
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [item.lon, item.lat]
                    },
                    'properties': {
                        'image-name': key,
                        'name': (items![key].pricePerDay / 100) + '€/day',
                        'id': key,
                        'type': 'item',
                        'size': 0.25,
                        'size2': 0.3
                    }
                }
            )
        }
        console.log(features.length)
        setImagesLoading(false)
        updateItemLayer(map.current!, features)
    }),[items, updateItemLayer])

    useEffect(()=>{
        if(areImagesLoading || !items || !images || !map.current || Object.keys(items).length === 0 || Object.keys(images).length === 0){
            return
        }
        setImagesLoading(true)
        loadImages(map.current, images, loaded => {
            if(mapWasLoaded){
                onImagesLoaded(loaded);
                return;
            }
            map.current!.on('load', () => {
                onImagesLoaded(loaded);
            })

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[items, map.current])

    const updateTextLayer = useMemo(()=>(
            function updateTextLayer(map: mapboxgl.Map,features: GeoJSON.Feature<GeoJSON.Geometry>[] ){
                //console.log("update layers with features");
                (map.getSource('texts') as GeoJSONSource).setData({
                    'type': 'FeatureCollection',
                    features
                })
            }),
        [])

    const onItemMouseLeave = useMemo(()=>(function (){
        highLightItem && highLightItem(undefined);
        updateTextLayer(map.current!,[]);
    }),[highLightItem, updateTextLayer])

    const onItemMouseOver = useMemo(()=>{
        // console.log("set on mouse over")
        // console.log(items)
        return function (features : MapboxGeoJSONFeature[]){
        // console.log("on mouse over")
        if(!items){
            // console.log('no items found')
            return;
        }
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
                            'name': (item.pricePerHour / 100) + '€/hour',
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
    }},[highLightItem, items, updateTextLayer])

    useEffect(()=>{
        if(!map.current || !items){
            return
        }
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
    }, [items, map, onItemMouseLeave, onItemMouseOver, onSelectFeatures])

    const initDataLayers = useMemo(()=>(
        function (map: mapboxgl.Map){
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
        }),[])

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
            setMapWasLoaded(true)
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

    },[initDataLayers, items, lat, lng, onItemMouseLeave, onItemMouseOver, onSelectFeatures, zoom]);
    return <div><div ref={mapContainer as React.RefObject<HTMLDivElement>} className={className} /></div>
}
