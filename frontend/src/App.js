/* eslint-disable no-unused-vars */
import React, { useState, createContext } from "react";
import MapComponent from "./components/Map/map.component";
import styles from "./App.module.css"; // Import css modules stylesheet as styles
import RegisterPin from "./components/RegisterPin/registerpin.component";
import AdjustIcon from "@mui/icons-material/Adjust";
import { Tooltip } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

export const MapContext = createContext({ lat: 0, lng: 0 });
export const PinListContext = createContext([]);

function App() {
  const [render, setRender] = useState(false);
  const [selectedLatLng, setSelectedLatLng] = useState({ lat: 0, lng: 0 });
  const [pinList, setPinList] = useState([]);
  const handleRender = () => {
    setRender((prev) => !prev);
  };
  const THEME = createTheme({
    typography: {
      fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });
  return (
    <ThemeProvider theme={THEME}>
      <PinListContext.Provider value={{ pinList, setPinList }}>
        <MapContext.Provider value={{ selectedLatLng, setSelectedLatLng }}>
          <div className={styles.App}>
            <div className={styles.navbar}>
              ForAll - see your nearby supported accessible public places.{" "}
            </div>
            <Tooltip title="Click the button to Re-center the map">
              <div className={styles.centerButton} onClick={handleRender}>
                <AdjustIcon />
              </div>
            </Tooltip>
            {/* -- register your store and category -- show it on map */}
            <div className={styles.mapContainer}>
              <MapComponent />
            </div>
            <div className={styles.register}>
              <RegisterPin />
            </div>
          </div>
        </MapContext.Provider>
      </PinListContext.Provider>
    </ThemeProvider>
  );
}

export default App;
