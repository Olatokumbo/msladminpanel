import * as React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./addmemberdialog.scss";
import {
  serverTimestamp,
  collection,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import Button from "@mui/material/Button";
import ButtonWrapper from "../../formsui/button/Button";
import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Textfield from "../../../components/formsui/textfield/Textfield";
import Select from "../../../components/formsui/select/Select";
import membershiptype from "../../../data/formsdata/membershiptype.json";

export function AddMemberDialog({ clientId, title }) {
  const [open, setOpen] = React.useState(false);
  const clientDocRef = doc(db, "clients", clientId);
  let memberId = "";

  const INITIAL_FORM_STATE = {
    clientId: "",
    membershipType: "",
    facial: "",
    facialCounter: "",
    slimming: "",
    slimmingCounter: "",
    companions: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    membershipType: Yup.string().required("Membership Type Rquired"),
    facial: Yup.number()
      .integer()
      .typeError("Please enter a valid number")
      .required("Facial Number Required"),
    slimming: Yup.number()
      .integer()
      .typeError("Please enter a valid number")
      .required("If None put 0"),
    companions: Yup.number()
      .integer()
      .typeError("Please enter a valid number")
      .required("If None Put 0"),
  });

  const handleAdd = async (data) => {
    try {
      await addDoc(collection(db, "members"), {
        ...data,
        clientId: clientId,
        facialCounter: 0,
        slimmingCounter: 0,
        timeStamp: serverTimestamp(),
      }).then(function (docRef) {
        memberId = docRef.id;
      });
      await updateDoc(clientDocRef, {
        memberId: memberId,
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
        Add Membership
      </Button>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleAdd}
      >
        <Dialog open={open} onClose={handleClose}>
          <Form>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <Select
                    name="membershipType"
                    label="Membership Type"
                    options={membershiptype}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Textfield
                    name="facial"
                    label="Facial Treatmemts Number"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Textfield
                    name="slimming"
                    label="Slimming Treatmemts Number"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Textfield
                    name="companions"
                    label="Companions Number"
                    type="number"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <div className="buttonWrapper" onClick={handleClose}>
                <ButtonWrapper>Add Member</ButtonWrapper>
              </div>
            </DialogActions>
          </Form>
        </Dialog>
      </Formik>
    </div>
  );
}

export default AddMemberDialog;
