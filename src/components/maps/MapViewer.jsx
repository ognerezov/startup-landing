import React, { useEffect, useRef, useState} from 'react'
import mapboxgl from 'mapbox-gl';
import {DEFAULT_SPOT} from "../../services/GeoSearch"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoicG9sYXJvc28iLCJhIjoiY2w0NWx0OHA3MDI3bTNrbjZyeWIxcG95aSJ9.XJVCOv41BrAzsKm9Ye2ygQ';


export const MapViewer = props => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(DEFAULT_SPOT.lon);
    const [lat, setLat] = useState(DEFAULT_SPOT.lat);
    const [zoom, setZoom] = useState(12);
    // const [initialized,setInitialized] = useState(false);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [lng, lat], // starting position [lng, lat]
            zoom: zoom
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));

        });
        map.current.on('load', () => {
            console.log(zoom)
        });
    });
    return <div><div ref={mapContainer} className="map-container-landscape" /></div>
}