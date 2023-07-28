import { MapContainer, TileLayer, Marker, Popup, Polygon, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import * as leaflet from "leaflet";

import world from './countries.geo.json'
// with id from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3

const Map = () => {
  const getColor = (id) => {
    return id === 'USA' ? "#ff7800" :
      id === 'BRA' ? "#800026" :
        '#E3141C';
  }

  const geojsonStyle = (feature) => {
    console.log(feature)
    return {
      "dashArray": '3',
      "color": getColor(feature.id),
      "weight": 2,
      "opacity": 0.65
    }
  }

  const geojsonFeatures = (feature, layer) => {
    layer.bindPopup('Country id: ' + feature.id);
  }

  return (
    <MapContainer center={[40.8054, -74.0241]}
      zoom={4}
      scrollWheelZoom={true}
      // 64px is the size of the top bar
      style={{ minHeight: "calc(100vh - 64px)", width: "100%" }}
      worldCopyJump={true}
    >
      <TileLayer

        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON data={world} onEachFeature={geojsonFeatures} style={geojsonStyle} />
    </MapContainer>
  )
}

export default Map
