import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import * as leaflet from "leaflet";


import json from './brazil.json'



const Map = () => {

  console.log(json.features[0].geometry.coordinates[0])
  const tmp = json.features[0].geometry.coordinates[0]

  const part = leaflet.GeoJSON.coordsToLatLngs(tmp)

  return (
    <MapContainer center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ minHeight: "calc(100vh - 64px)", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon positions={part} />

      <Marker position={[40.8054, -74.0241]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

    </MapContainer>
  )
}

export default Map
