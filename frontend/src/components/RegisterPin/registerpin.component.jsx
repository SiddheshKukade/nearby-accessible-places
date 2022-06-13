import React, { useContext } from "react";
import styles from "./registerpin.module.css";
import * as Yup from "yup";
import axios from "axios";
import Button from "@mui/material/Button";
import { Formik, Field, Form } from "formik";
import TextField from "@mui/material/TextField";
import { MapContext, PinListContext } from "../../App";
const RegisterPin = () => {
  let { selectedLatLng, setSelectedLatLng } = useContext(MapContext);
  const { pinList, setPinList } = useContext(PinListContext);

  const handleSubmit = async (values, e) => {
    if (selectedLatLng.lat == 0) {
      alert(
        "Please select a Location on Map Application will detect the location automatically."
      );
      return;
    }
    const { username, title, desc } = values;

    const newPin = {
      username: username,
      title: title,
      desc: desc,
      long: selectedLatLng.lng,
      lat: selectedLatLng.lat,
    };

    try {
      const res = await axios.post(
        "https://8800-siddheshkuk-nearbyacces-09ftreuj6j1.ws-us47.gitpod.io/api/pins/",
        newPin
      ); // replace with your server URL
      console.log("Result of the form ", res);
      // setPins([...pins, res.data]);
      // setNewPlace(null);
      setPinList((prev) => [...prev, newPin]);
      console.log("new Pin Added to the lLIsts  ", pinList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* small heading */}
      <div className={styles.navbar}>
        <h2>
          Choose location from the map and Register your public place here
        </h2>
      </div>
      {/* form to register  */}
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            username: "",
            title: "",
            desc: "",
          }}
          onSubmit={handleSubmit}
          className={styles.formikform}
        >
          <Form>
            <Field
              as={TextField}
              variant="outlined"
              helperText="make sure to enter complete name"
              label="Name of the owner"
              id="username"
              name="username"
              placeholder="Mr.John Doe"
            />

            <Field
              as={TextField}
              variant="outlined"
              helperText="don't include address in title"
              label="Name of the Shop/School/Place"
              id="title"
              name="title"
              placeholder="Ex. City hospital"
            />

            <Field
              as={TextField}
              variant="outlined"
              helperText="enter a brief description"
              label="Description: "
              id="desc"
              name="desc"
              placeholder="Ex.We provide various sevices for disabled people like ...."
              type="textarea"
            />
            <Button type="submit" variant="outlined">
              Add to the Map
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default RegisterPin;
