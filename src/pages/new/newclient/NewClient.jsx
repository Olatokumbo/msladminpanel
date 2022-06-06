import React from "react";
import "./newclient.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Typography, Grid } from "@mui/material";
import Textfield from "../../../components/formsui/textfield/Textfield";
import Select from "../../../components/formsui/select/Select";
import Button from "../../../components/formsui/button/Button";
import sex from "../../../data/formsdata/sex.json";
import clientclass from "../../../data/formsdata/clientclass.json";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormControlLabel, Switch, RadioGroup } from "@mui/material";

export const NewClient = ({ dbtype, title }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    clientClass: "",
    email: "",
    phone: "",
    memberId: "",
    callCenter: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required("First name Rquired"),
    lastName: Yup.string().required("Last name Rquired"),
    age: Yup.number()
      .integer()
      .typeError("Please enter a valid phone number")
      .required("Age Rquired"),
    sex: Yup.string().required("Sex Rquired"),
    clientClass: Yup.string().required("Class is Rquired"),
    email: Yup.string().email("Invalid Email").required("Email Required"),
    phone: Yup.number()
      .integer()
      .typeError("Please enter a valid phone number")
      .required("Phone Required"),
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
    <div className="newClient">
      <Sidebar />
      <div className="newClientContainer">
        <Navbar />
        <div className="newClientFormContainer">
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
                  <Grid item xs={6}>
                    <Textfield name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name="lastName" label="Last Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <Textfield name="age" label="Age" />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="sex" label="Gender" options={sex} />
                  </Grid>
                  <Grid item xs={4}>
                    <Select
                      name="clientClass"
                      label="Class"
                      options={clientclass}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield name="phone" label="Phone" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch checked={checked} onChange={switchHandler} />
                      }
                      label="Call Center"
                    />
                    {checked ? (
                      <div>
                        <RadioGroup row aria-labelledby="Call Center">
                          <FormControlLabel
                            control={
                              <Field
                                type="radio"
                                name="callCenter"
                                value="MSL"
                              />
                            }
                            label=" MSL"
                          />
                          <FormControlLabel
                            control={
                              <Field
                                type="radio"
                                name="callCenter"
                                value="LS"
                              />
                            }
                            label="LS"
                          />
                        </RadioGroup>
                      </div>
                    ) : (
                      ""
                    )}
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
export default NewClient;
