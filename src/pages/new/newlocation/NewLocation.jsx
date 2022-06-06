import React from "react";
import "./newlocation.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Typography, Grid } from "@mui/material";
import Textfield from "../../../components/formsui/textfield/Textfield";
import Button from "../../../components/formsui/button/Button";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

export const NewLocation = ({ dbtype, title }) => {
  const navigate = useNavigate();

  const INITIAL_FORM_STATE = {
    locationName: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    locationName: Yup.string().required("Location Name Rquired"),
  });

  const handleAdd = async (data) => {
    try {
      await addDoc(collection(db, dbtype[0].type), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="newLocation">
      <Sidebar />
      <div className="newLocationContainer">
        <Navbar />
        <div className="newLocationFormContainer">
          <div className="formContainer">
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleAdd}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>{title}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield name="locationName" label="Location Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <Button>Submit</Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewLocation;
