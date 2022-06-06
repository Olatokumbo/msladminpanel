import React from "react";
import "./newsale.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Typography, Grid } from "@mui/material";
import MultipleSelect from "../../../components/formsui/multipleselect/MultipleSelect";
import Button from "../../../components/formsui/button/Button";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import SpTags from "../../../components/formsui/autocomplete/SpAutocomplete";
import ProductsTags from "../../../components/formsui/autocomplete/ProductsAutocomplete";

export const NewSale = ({ dbtype, title }) => {
  const navigate = useNavigate();

  const INITIAL_FORM_STATE = {
    memberId: "",
    name: "",
    salesperson: "",
    productsBought: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    memberId: Yup.string().required("First name Rquired"),
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
    <div className="newSale">
      <Sidebar />
      <div className="newSaleContainer">
        <Navbar />
        <div className="newSaleFormContainer">
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
                  <Grid item xs={6}>
                    <h1>Member Id</h1>
                  </Grid>
                  <Grid item xs={6}>
                    <h1>name</h1>
                  </Grid>
                  <Grid item xs={12}>
                    <SpTags name="salesperson" label="Salesperson" />
                  </Grid>
                  <Grid item xs={12}>
                    <ProductsTags
                      name="productsBought"
                      label="Products Bought"
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
export default NewSale;
