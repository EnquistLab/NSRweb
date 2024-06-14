import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import React, { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import world from './countries.geo.json';
import { ChecklistsDialog } from "../../components/";

const Map = ({ checklistsByCountry, checklistsInfo, citations }) => {
  const [open, setOpen] = useState(false);
  const [checklistName, setChecklistName] = useState('');

  const handleClickOpen = (checklist) => {
    setChecklistName(checklist);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getColor = (id) => {
    if (id in checklistsByCountry) {
      let length = checklistsByCountry[id].sources.split(',').length;
      return length === 1 ? "#D6D58E" :
          length === 2 ? "#005C53" :
              '#042940';
    }
  };

  const geojsonFilter = (geojson) => {
    return geojson.id in checklistsByCountry;
  };

  const geojsonStyle = (feature) => {
    return {
      "dashArray": '5',
      "color": getColor(feature.id),
      "weight": 2,
      "opacity": 1
    };
  };

  const addLinks = () => {
    const links = document.getElementsByClassName("popup-button-link");
    if (links) {
      for (let link of links) {
        link.addEventListener("click", (e) => { handleClickOpen(e.target.innerText) });
      }
    }
  };

  const removeLinks = () => {
    const links = document.getElementsByClassName("popup-button-link");
    if (links) {
      for (let link of links) {
        link.removeEventListener("click", (e) => handleClickOpen(e.target.innerText));
      }
    }
  };

  const geojsonFeatures = (feature, layer) => {
    if (checklistsByCountry[feature.id] !== undefined) {
      let links = checklistsByCountry[feature.id].sources
          .split(',')
          .map((s) => '<a href="#" class="popup-button-link">' + s + '</a>')
          .join(', ');

      layer
          .addEventListener('popupopen', addLinks)
          .addEventListener('popupclose', removeLinks)
          .bindPopup(
              '<strong>' + checklistsByCountry[feature.id].country + '</strong><br>'
              + 'Checklists available: '
              + links
          );
    }
  };

  const DefaultZoomControl = () => {
    const map = useMap();

    const handleDefaultZoom = () => {
      map.setView([0, 0], 2);
    };

    useEffect(() => {
      // Add a custom control button for returning to default zoom
      const defaultZoomButton = L.control({ position: 'topleft' });
      defaultZoomButton.onAdd = function (map) {
        const button = L.DomUtil.create('button', 'default-zoom-button leaflet-bar leaflet-control leaflet-control-custom');
        button.innerHTML = '<b>⌂</b>';
        button.title = "Default Zoom";
        button.style.backgroundColor = 'white';
        button.style.left = '2px';
        button.style.width = '32px';
        button.style.height = '32px';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.onclick = handleDefaultZoom;
        return button;
      };
      defaultZoomButton.addTo(map);

      return () => {
        defaultZoomButton.remove();
      };
    }, [map]);

    return null;
  };

  return (
      <>
        <ChecklistsDialog
            open={open}
            onClose={handleClose}
            checklistName={checklistName}
            checklistsInfo={checklistsInfo}
            citations={citations}
        />

        <MapContainer
            center={[0, 0]}
            zoom={2}
            scrollWheelZoom={true}
            style={{ minHeight: "calc(100vh - 64px)", width: "100%" }}
            maxBounds={[[-85, -180], [85, 180]]} // Adjusted bounds to restrict excess map
            maxBoundsViscosity={1.0}
            minZoom={2}
        >
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeoJSON filter={geojsonFilter} data={world} onEachFeature={geojsonFeatures} style={geojsonStyle} />
          <DefaultZoomControl />
        </MapContainer>
      </>
  );
};

export default Map;
