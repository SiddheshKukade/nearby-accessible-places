import React from "react";
import styles from "./registerpin.module.css";

import { Formik, Field, Form } from 'formik';

const RegisterPin = () => {
  return (
    <>
      {/* small heading */}
      <div className={styles.navbar}>
        <h1>j
          Choose location from the map and Register your public place here
        </h1>
      </div>
      {/* form to register  */}
      <div className={styles.formContainer}>
        <form className={styles.form}>

        </form>
      </div>
    </>
  );
};

export default RegisterPin;
