"use client"
import { useRef, useEffect } from 'react';
import geojsonFeature from '../Helpers/state.geojson.js';
import HeatMap from '../Helpers/HeatMap.js';
import Markers from '../Helpers/Markers.js';


export default function Map({ records }) {

    const map = useRef();

    useEffect(() => {

        if (!map.current) {

            let heatmapLayer = HeatMap(records);
            let markerLayer = L.layerGroup(Markers(records));

            const defaultLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: 'State Police'
            });

            map.current = L.map('map', { layers: [defaultLayer, heatmapLayer] }).setView([12, 77], 8);

            let baseMaps = {
                "Default": defaultLayer
            };

            let AdvanceLayers = {
                '<span class="heatToggle">Toggle HeatMap</span>': heatmapLayer,
                '<span class="markerToggle">Toggle Marker</span>': markerLayer
            };

            L.control.layers(baseMaps, AdvanceLayers, { hideSingleBase: true }).addTo(map.current);

            L.geoJSON(geojsonFeature, {
                "color": "red",
                "weight": 2,
                "opacity": 1,
                fillColor: "transparent",
            }).addTo(map.current);
        }
    });

    return (
        <>
            <div id='map' className="w-full h-full rounded-lg"></div>
        </>
    );
}
