import React from "react";
import "./newproduct.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Typography, Grid } from "@mui/material";
import Textfield from "../../../components/formsui/textfield/Textfield";
import Select from "../../../components/formsui/select/Select";
import Button from "../../../components/formsui/button/Button";
import brand from "../../../data/formsdata/brand.json";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

export const NewProduct = ({ dbtype, title }) => {
  const navigate = useNavigate();

  const INITIAL_FORM_STATE = {
    productName: "",
    brand: "",
    minprice: "",
    maxprice: "",
    serial: false,
  };
  const FORM_VALIDATION = Yup.object().shape({
    productName: Yup.string().required("Product Name Rquired"),
    brand: Yup.string().required("Brand Name Rquired"),
    minprice: Yup.number()
      .integer()
      .typeError("Please enter a valid number")
      .required("Min Price Required"),
    maxprice: Yup.number()
      .integer()
      .typeError("Please enter a valid number")
      .required("Max Price Required"),
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
    <div className="newProduct">
      <Sidebar />
      <div className="newProductContainer">
        <Navbar />
        <div className="newProductFormContainer">
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
                    <Textfield name="productName" label="Product Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="brand" label="Brand" options={brand} />
                  </Grid>
                  <Grid item xs={4}>
                    <Textfield
                      name="minprice"
                      label="Min Price"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Textfield
                      name="maxprice"
                      label="Max Price"
                      type="number"
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
export default NewProduct;
