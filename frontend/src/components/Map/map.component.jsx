import React, { useContext, useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { MapContext } from "../../App";
import axios from "axios";

const MapComponent = () => {
  const [cLat, setcLat] = useState(20.0005);
  const [cLang, setcLang] = useState(70.0005);

  const [markersList, SetMarkersList] = useState([]);

  const [lat, setLat] = useState(20.0045);
  const [long, setLong] = useState(70.0005);
  const zoomLevel = 15; // default zoom level
  let { selectedLatLng, setSelectedLatLng } = useContext(MapContext);

  navigator.geolocation.getCurrentPosition((position) => {
    setcLat(position.coords.latitude);
    setcLang(position.coords.longitude);
  });
  const initialMarkers = [
    {
      position: {
        lat: 28.625485,
        lng: 79.821091,
      },
      label: { color: "white", text: "P1" },
      draggable: true,
    },
    {
      position: {
        lat: 28.625293,
        lng: 79.817926,
      },
      label: { color: "white", text: "P2" },
      draggable: false,
    },
    {
      position: {
        lat: 28.625182,
        lng: 79.81464,
      },
      label: { color: "white", text: "P3" },
      draggable: true,
    },
    {
      position: {
        lat: cLat,
        lng: cLang,
      },
      label: { color: "white", text: "Dental Hospital" },
      draggable: true,
    },
    {
      position: {
        lat: 20.0024,
        lng: 73.7945,
      },
      label: { color: "white", text: "Siddhesh Location" },
      draggable: true,
    },
  ];

  const [activeInfoWindow, setActiveInfoWindow] = useState("");
  const [markers, setMarkers] = useState(initialMarkers);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 20.0024,
    lng: 73.7945,
  };

  const mapClicked = (event) => {
    setLong(event.latLng.lng());
    setLat(event.latLng.lat());
    setSelectedLatLng({ lat: lat, lng: long });
  };

  const markerClicked = (marker, index) => {
    setActiveInfoWindow(index);
    console.log(marker, index);
  };

  const markerDragEnd = (event, index) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  };
  const fetchPins = async () => {
    try {
      const res = await axios.get(
        "https://8800-siddheshkuk-nearbyacces-09ftreuj6j1.ws-us47.gitpod.io/api/pins/"
      );
      const newData = res.data.map((arr, i) => {
        return {
          position: {
            lat: arr.lat,
            lng: arr.long,
          },
          label: {
            color: "#000",
            fontWeight: "bold",
            fontSize: "2rem",
            text: arr.title,
          },
          draggable: false,
        };
      });
      SetMarkersList(res.data);
      setMarkers(newData);
      console.log("requqrt from the axios ge NEw datat ", res.data, newData);
      // setPins([...pins, res.data]);
      // setNewPlace(null);
    } catch (err) {
      console.log("Error at  fetching Pins ", err);
    }
  };
  useEffect(() => {
    fetchPins();
  }, []);

  console.log("markers list", markersList);
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoomLevel}
        onClick={mapClicked}
      >
        {console.log("markers list in hml", markers)}
        {markers.map((marker, index) => (
          <Marker onDblClick={handleClickLandMark}
            key={index}
            position={marker.position}
            label={marker.label}
            draggable={marker.draggable}
            onDragEnd={(event) => markerDragEnd(event, index)}
            onClick={(event) => markerClicked(marker, index)}
          >
            {activeInfoWindow === index && (
              <InfoWindow position={marker.position}>
                <b>
                  {marker.position.lat}, {marker.position.lng}
                </b>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
