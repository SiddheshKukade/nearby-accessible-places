import React, { useState, useEffect } from "react";
import MapComponent from "./components/Map/map.component";
import styles from "./App.module.css"; // Import css modules stylesheet as styles
import RegisterPin from "./components/RegisterPin/registerpin.component";
import AdjustIcon from "@mui/icons-material/Adjust";
import { Tooltip } from "@mui/material";
function App() {
  const [render, setRender] = useState(false);
  const handleRender = () => {
    setRender((prev) => !prev);
  };
  return (
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
        {" "}
        <RegisterPin />
      </div>
    </div>
  );
}

export default App;
