import React from "react";
import "./newclientschedule.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Typography, Grid, FormControl, FormGroup } from "@mui/material";
import Textfield from "../../../components/formsui/textfield/Textfield";
import Button from "../../../components/formsui/button/Button";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { ClientsSelect } from "../../../components/formsui/autocomplete/ClientsAutocomplete";
import { LocationsSelect } from "../../../components/formsui/autocomplete/LocationAutocomplete";
import CheckboxWrapper from "../../../components/formsui/checkbox/CheckBox";
import CheckBoxGroup from "../../../components/formsui/checkboxgroup/CheckBoxGroup";

export const NewClientSchedule = ({ dbtype, title }) => {
  const navigate = useNavigate();

  const INITIAL_FORM_STATE = {
    locationName: "",
    locationId: "",
    clientName: "",
    clientId: "",
    facial: "",
    rf: "",
    cocoon: "",
    ems: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    locationName: Yup.string().required("Location Name Rquired"),
    clientName: Yup.string().required("Client Name Rquired"),
    facial: Yup.bool(),
    rf: Yup.bool(),
    cocoon: Yup.bool(),
    ems: Yup.bool(),
  });

  const handleAdd = (data) => {
    console.log(data);

    /*
    try {
      await addDoc(collection(db, dbtype[0].type), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
*/
  };
  return (
    <div className="newClientSchedule">
      <Sidebar />
      <div className="newClientScheduleContainer">
        <Navbar />
        <div className="newClientScheduleFormContainer">
          <div className="formContainer">
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              //validationSchema={FORM_VALIDATION}
              onSubmit={handleAdd}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>{title}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LocationsSelect />
                  </Grid>
                  <Grid item xs={12}>
                    <ClientsSelect />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormGroup>
                        <CheckboxWrapper
                          name="facial"
                          value="FACIAL"
                          label="Facial"
                        />
                        <CheckboxWrapper name="rf" value="RF" label="RF" />
                        <CheckboxWrapper
                          name="cocoon"
                          value="COCOON"
                          label="Cocoon"
                        />
                        <CheckboxWrapper name="ems" value="EMS" label="EMS" />
                      </FormGroup>
                    </FormControl>
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
export default NewClientSchedule;
