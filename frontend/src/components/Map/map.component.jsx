/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { MapContext, PinListContext } from "../../App";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const MapComponent = () => {
  const [infoObj, setInfoObj] = useState({
    title: "Loding title",
    username: "Loding username",
    desc: "Loding description",
  }); //for info Modal
  const [cLat, setcLat] = useState(20.0005);
  const [cLang, setcLang] = useState(70.0005);
  const { pinList, setPinList } = useContext(PinListContext);
  console.log("Pinlist at the map ", pinList);

  const [markersList, SetMarkersList] = useState([]);

  const [lat, setLat] = useState(20.0045);
  const [long, setLong] = useState(70.0005);
  const zoomLevel = 15; // default zoom level
  // eslint-disable-next-line no-unused-vars
  let { selectedLatLng, setSelectedLatLng } = useContext(MapContext);

  const [open, setOpen] = React.useState(false);

  const handleOpen = (title, desc, username) => {
    setInfoObj({ title, desc, username });
    setOpen(true);
    console.log("Inforbov", infoObj.title, infoObj.desc, infoObj.username);
  };
  const handleClose = () => setOpen(false);

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
    setSelectedLatLng({ lat: event.latLng.lat(), lng: event.latLng.lng() });
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
          title: arr.title,
          desc: arr.desc,
          username: arr.username,
        };
      });
      SetMarkersList(res.data);
      setMarkers(newData);
      setPinList((prev) => [...prev, ...newData]);
      console.log("requqrt from the axios ge NEw datat ", res.data);
      // setPins([...pins, res.data]);
      // setNewPlace(null);
    } catch (err) {
      console.log("Error at  fetching Pins ", err);
    }
  };
  useEffect(() => {
    fetchPins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinList]);

  console.log("markers list", markersList);
  return (
    <>
      {" "}
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoomLevel}
          onClick={mapClicked}
        >
          {console.log("markers list in hml", markers)}
          {pinList.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              label={marker.label}
              draggable={marker.draggable}
              onDragEnd={(event) => markerDragEnd(event, index)}
              onClick={(event) => {
                markerClicked(marker, index);
                handleOpen(marker.title, marker.desc, marker.username);
              }}
            >
              {activeInfoWindow === index && (
                <InfoWindow position={marker.position}>
                  <div>
                    <h1>{marker.title}</h1>
                    <b>
                      Co-Ordinates: {marker.position.lat}, {marker.position.lng}
                    </b>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Name of the Place
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {infoObj.title}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Owner of the place
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {infoObj.username}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {infoObj.desc}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default MapComponent;
