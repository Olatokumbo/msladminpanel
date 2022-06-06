import * as React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./addsaledialog.scss";
import Button from "@mui/material/Button";
import ButtonWrapper from "../../formsui/button/Button";
import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SpTags } from "../../formsui/autocomplete/SpAutocomplete";
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ProductsTags } from "../../formsui/autocomplete/ProductsAutocomplete";
import Textfield from "../../formsui/textfield/Textfield";
import { useState } from "react";

export function AddSaleDialog({ clientData, title, memberId }) {
  const [open, setOpen] = useState(false);
  const [isMember, setIsMember] = useState("");

  const INITIAL_FORM_STATE = {
    salespersons: "",
    productsBought: "",
    totalSale: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    salespersons: Yup.array().min(1, "At least 1 salesperson required"),
    productsBought: Yup.array().min(1, "At least 1 salesperson required"),
    totalSale: Yup.number()
      .integer()
      .typeError("Please enter a valid number")
      .required("Total sale amuount required"),
  });

  const handleAdd = async (data) => {
    console.log(data);
    let spidlist = [];
    let spnamelist = [];
    let productsidlist = [];
    let productnamelist = [];

    data.salespersons.map((salesperson) => {
      spidlist.push(salesperson.id);
      spnamelist.push(salesperson.firstName + " " + salesperson.lastName);
    });
    data.productsBought.map((product) => {
      productsidlist.push(product.id);
      productnamelist.push(product.name);
    });

    if (memberId) {
      setIsMember(memberId);
    } else {
      setIsMember("");
    }

    try {
      await addDoc(collection(db, "sales"), {
        salespersonsId: spidlist,
        salespersonsName: spnamelist,
        productsBoughtId: productsidlist,
        productsBoughtNames: productnamelist,
        totalSale: data.totalSale,
        clientName: clientData.firstName + " " + clientData.lastName,
        memberId: isMember,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className="button" color="secondary" onClick={handleClickOpen}>
        Add Sale
      </Button>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleAdd}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth={true}
        >
          <Form>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SpTags />
                </Grid>
                <Grid item xs={6}>
                  <ProductsTags />
                </Grid>
                <Grid item xs={6}>
                  <Textfield
                    name="totalSale"
                    label="Total Sale"
                    type="number"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <div className="buttonWrapper">
                <ButtonWrapper>Add Sale</ButtonWrapper>
              </div>
            </DialogActions>
          </Form>
        </Dialog>
      </Formik>
    </div>
  );
}

export default AddSaleDialog;
