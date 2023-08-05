import { MapContainer, TileLayer, Marker, Popup, Polygon, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
// import * as leaflet from "leaflet";
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { Button } from '@mui/material';

import world from './countries.geo.json'
// with id from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3

const Map = ({ checklists }) => {
  const test = () => {
    alert('test')
  }

  const getColor = (id) => {
    if (id in checklists) {
      let length = checklists[id].sources.split(',').length
      return length == 1 ? "#D6D58E" :
        length === 2 ? "#005C53" :
          '#042940';
    }
  }

  const geojsonFilter = (geojson) => {
    if (geojson.id in checklists) {
      return true
    }
    return false
  }

  const geojsonStyle = (feature) => {
    return {
      "dashArray": '5',
      "color": getColor(feature.id),
      "weight": 2,
      "opacity": 1
    }
  }

  const addLinks = () => {
    const links = document.getElementsByClassName("popup-button-link");
    if (links) {
      for (let link of links) {
        link.addEventListener("click", (e) => console.log(e.target.innerText));
      }
    }
  };

  const removeLinks = () => {
    const links = document.getElementsByClassName("popup-button-link");
    if (links) {
      for (let link of links) {
        link.removeEventListener("click", (e) => console.log(e.target.innerText));
      }
    }
  };

  const geojsonFeatures = (feature, layer) => {
    if (checklists[feature.id] !== undefined) {
      let links = checklists[feature.id].sources
        .split(',')
        .map((s) => '<a class="popup-button-link">' + s + '</a>')
        .join(', ')

      layer
        .addEventListener('popupopen', addLinks)
        .addEventListener('popupclose', removeLinks)
        .bindPopup(
          checklists[feature.id].country + '<br>'
          + 'Checklists available: '
          + links
        );
    }
  }

  return (
    <>
      <Button variant="outlined" onClick={test}>
        Open simple dialog
      </Button>
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

        <GeoJSON filter={geojsonFilter} data={world} onEachFeature={geojsonFeatures} style={geojsonStyle} />
      </MapContainer>
    </>
  )
}

export default Map
