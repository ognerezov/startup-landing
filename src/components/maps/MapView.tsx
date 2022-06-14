import React, {FC, useEffect, useRef, useState} from 'react'
import mapboxgl, {MapboxGeoJSONFeature} from 'mapbox-gl';
import {DEFAULT_SPOT} from "../../backend/GeoSearch";
import {loadImages} from "../../services/MapboxUtil";
import {IItemContext} from "../../context/context";
import {Item} from "../../model/items";
import {goToItem} from "../../config/ServerAddress"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoicG9sYXJvc28iLCJhIjoiY2w0NWx0OHA3MDI3bTNrbjZyeWIxcG95aSJ9.XJVCOv41BrAzsKm9Ye2ygQ';

interface MapViewProps extends IItemContext{
    className ?: string
    selectItem ?: (item : Item) => void
}

export const MapView :FC<MapViewProps> = ({items,images, className}) => {
    const mapContainer = useRef<HTMLElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [lng, setLng] = useState<number>(DEFAULT_SPOT.lon);
    const [lat, setLat] = useState<number>(DEFAULT_SPOT.lat);
    const [zoom, setZoom] = useState<number>(13);

    function onSelectFeatures(features : MapboxGeoJSONFeature[]){
        console.log(features)
        for(const feature of features){
            if(feature.properties && feature.properties['type'] === 'item'){
                feature.properties['id'] && goToItem(feature.properties['id'])
            }
        }
    }

    useEffect(() => {
        if (map.current) {
            map.current.on('move', () => {
                setLng(+map.current!.getCenter().lng.toFixed(4));
                setLat(+map.current!.getCenter().lat.toFixed(4));
                setZoom(+map.current!.getZoom().toFixed(2));

            });
            items && loadImages(map.current!,images!,loaded => {
                map.current!.on('load', () => {
                    const features : GeoJSON.Feature<GeoJSON.Geometry>[]= [];
                    for(const key in loaded){
                        if(!loaded[key] || map.current!.hasImage(key)) continue;
                        map.current!.addImage(key, loaded[key]!, {
                            pixelRatio: 2
                        });
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
                                    'id' : key,
                                    'type' : 'item',
                                    'size' : 0.25,
                                    'size2' : 0.3
                                }
                            }
                        )
                        map.current!.addSource('points', {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                features
                            }
                        });

                        map.current!.addLayer({
                            'id': 'items',
                            'type': 'symbol',
                            'source': 'points',
                            'layout': {
                                'text-field': ['get', 'name'],
                                'text-anchor' :'bottom',
                                'text-offset' : [0,3],
                               // 'icon-text-fit': 'both',
                                'icon-image': ['get', 'image-name'],
                                'icon-size' : ['get', 'size'],
                                'icon-allow-overlap': true,
                                'text-allow-overlap': true
                            }
                        });
                    }
                })

            })
            return;
        }
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('click', (event) => {
            const data : MapboxGeoJSONFeature[] = map.current!.queryRenderedFeatures(event.point, {
                layers: ['items']
            });
            onSelectFeatures(data)
        });
    });
    return <div><div ref={mapContainer as React.RefObject<HTMLDivElement>} className={className} /></div>
}