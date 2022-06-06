import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { db } from "../../../firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

export function SpTags() {
  const [salespersons, setSalespersons] = useState([]);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("role", "==", "SALESPERSON")
    );

    onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setSalespersons(list);
    });
  }, []);

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-outlined"
        name="salespersons"
        onChange={(event, value) => {
          setFieldValue("salespersons", value);
        }}
        options={salespersons}
        getOptionLabel={(option) => option.firstName + " " + option.lastName}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Salesperson" />}
      ></Autocomplete>
    </div>
  );
}

export default SpTags;
