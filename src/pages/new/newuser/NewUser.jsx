import React from "react";
import "./newuser.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Typography, Grid } from "@mui/material";
import Textfield from "../../../components/formsui/textfield/Textfield";
import Select from "../../../components/formsui/select/Select";
import Button from "../../../components/formsui/button/Button";
import roles from "../../../data/formsdata/roles.json";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const NewUser = ({ dbtype, title }) => {
  const navigate = useNavigate();

  const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
    role: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required("First name Rquired"),
    lastName: Yup.string().required("Last name Rquired"),
    password: Yup.string().required("No password provided"),
    email: Yup.string().email("Invalid Email").required("Email Required"),
    phone: Yup.number()
      .integer()
      .typeError("Please enter a valid phone number")
      .required("Phone Required"),
    role: Yup.string().required("Role Rquired"),
  });

  const handleAdd = async (data) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, dbtype[0].type, res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="newUser">
      <Sidebar />
      <div className="newUserContainer">
        <Navbar />
        <div className="newUserFormContainer">
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
                  <Grid item xs={12}>
                    <Textfield name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield name="password" label="Password" />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield name="phone" label="Phone" />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      name="role"
                      label="Role In The Company"
                      options={roles}
                    />
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
export default NewUser;
