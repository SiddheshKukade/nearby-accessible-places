import React from "react";
import styles from "./registerpin.module.css";
import * as Yup from "yup";
import Button from '@mui/material/Button';
import { Formik, Field, Form } from "formik";
import TextField from "@mui/material/TextField";
const RegisterPin = () => {
  const handleSubmit = (values) => {
    console.log("values", values);
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
            <Button type="submit"  variant="outlined">Add to the Map</Button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default RegisterPin;

// const validationSchema = Yup.object({
//   submitstudentName: Yup.string().required("name needed"),
//   fatherName: Yup.string().required("fathername needed"),
//   address: Yup.string()
//     .min(20, "Must be 20 character or less")
//     .required("address is required"),
//   phone: Yup.string()
//     .min(10, "Must be 10 characters")
//     .required("phone is required"),
//   selectStandard: Yup.string().required("please select standard"),
//   dob: Yup.date("please give correct date"),
//   refCode: Yup.string().required("Refercode is required"),
// });

// <Formik
// className={styles.form}
// initialValues={{
//   username: "",
//   title: "",
// }}
// validationSchema={validationSchema}
// onSubmit={handleSubmit}
// >
// {(formik) => {
//   const { errors, touched } = formik;

//   return (
//     <Form>
//       <InputForm
//         control="input"
//         type="text"
//         label="Name of the Owner"
//         isTouched={touched.username}
//         fullWidth="true"
//         name="username"
//         errMsg={errors.username}
//         placeholder="Ex.Mr. John doe"
//         className={styles.inputsIn}
//       />
//       <InputForm
//         control="input"
//         type="text"
//         label="Name of the Shop"
//         isTouched={touched.title}
//         fullWidth="true"
//         name="title"
//         errMsg={errors.title}
//         placeholder="Ex.Mr. John doe"
//         className={styles.inputsIn}
//       />
//       <InputForm
//         control="input"
//         type="text"
//         label="Name of the Shop "
//         isTouched={touched.firstName}
//         fullWidth="true"
//         name="firstName"
//         errMsg={errors.FirstName}
//         placeholder="Ex. City Hospital"
//         className={styles.inputsIn}
//       />
//       <InputForm
//         control="input"
//         type="text"
//         label="Description of the shop"
//         isTouched={touched.desc}
//         fullWidth="true"
//         name="desc"
//         errMsg={errors.desc}
//         placeholder="Ex.We provide various support for disabled peoples."
//         className={styles.inputsIn}
//       />
//       <button type="submit">Submit</button>
//     </Form>
//   );
// }}
// </Formik>
