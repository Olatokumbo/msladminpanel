import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { db } from "../../../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useFormikContext } from "formik";

export function LocationsSelect() {
  const [locations, setLocations] = useState([]);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "locations"),
      (snapShot) => {
        let list = [];
        snapShot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setLocations(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  return (
    <div>
      <Autocomplete
        onChange={(event, value) => {
          setFieldValue("locationName", value.locationName);
          setFieldValue("locationId", value.id);
        }}
        options={locations}
        getOptionLabel={(option) => option.locationName}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Location Name" />
        )}
      />
    </div>
  );
}
