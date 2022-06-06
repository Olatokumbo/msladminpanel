import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { db } from "../../../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useFormikContext } from "formik";

export function ClientsSelect() {
  const [clients, setClients] = useState([]);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "clients"),
      (snapShot) => {
        let list = [];
        snapShot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setClients(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      console.log(unsub);
    };
  }, []);
  return (
    <div>
      <Autocomplete
        onChange={(event, value) => {
          setFieldValue("clientName", value.firstName + " " + value.lastName);
          setFieldValue("clientId", value.id);
        }}
        options={clients}
        getOptionLabel={(option) => option.firstName + " " + option.lastName}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Client Name" />}
      />
    </div>
  );
}
