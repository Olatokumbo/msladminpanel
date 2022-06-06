import React, { useState } from "react";
import Textfield from "../../formsui/textfield/Textfield";
import Button from "../../formsui/button/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogActions } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const styles = {};

const contactFormEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT;

function AddMembership(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setSubmitionCompleted(false);
    setOpen(true);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Membership
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {!isSubmitionCompleted && (
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Contact</DialogTitle>
            <DialogContent>
              <DialogContentText>Send us a comment!</DialogContentText>
              <Formik
                initialValues={{ email: "", name: "", comment: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true).then((resp) => {
                    setSubmitionCompleted(true);
                  });
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email().required("Required"),
                  name: Yup.string().required("Required"),
                  comment: Yup.string().required("Required"),
                })}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <Textfield
                        error={errors.name && touched.name}
                        label="name"
                        name="name"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.name && touched.name && errors.name}
                        margin="nomal"
                      />

                      <Textfield
                        error={errors.email && touched.email}
                        label="email"
                        name="email"
                        className={classes.textField}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                        margin="nomal"
                      />

                      <Textfield
                        error={errors.comment && touched.comment}
                        label="comment"
                        name="comment"
                        className={classes.textField}
                        value={values.comment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.comment && touched.comment && errors.comment
                        }
                        margin="narmal"
                      />
                      <DialogActions>
                        <Button
                          type="button"
                          className="outline"
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                        >
                          Reset
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          Submit
                        </Button>
                      </DialogActions>
                    </form>
                  );
                }}
              </Formik>
            </DialogContent>
          </React.Fragment>
        )}
        {isSubmitionCompleted && (
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Thanks!</DialogTitle>
            <DialogContent>
              <DialogContentText>Thanks</DialogContentText>
              <DialogActions>
                <Button type="button" className="outline" onClick={handleClose}>
                  Back to app
                </Button>
              </DialogActions>
            </DialogContent>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default AddMembership;
