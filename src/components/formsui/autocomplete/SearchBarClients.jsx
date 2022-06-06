import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { db } from "../../../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClientsSelect } from "./ClientsAutocomplete";

export function SearchBarClients(inputs) {
  const { updateData } = inputs;
  const [clients, setClients] = useState([]);
  const [clientData, setClientData] = useState([]);
  let navigate = useNavigate();

  const openClientData = () => {
    console.log(clientData);
  };

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
    };
  }, []);

  return (
    <div>
      <Autocomplete
        onChange={(event, value) => {
          if (value) {
            setClientData(value);
          }
        }}
        options={clients}
        getOptionLabel={(option) =>
          option.firstName + " " + option.lastName + " - " + option.phone
        }
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Client Name" />}
      />
      <Button onClick={() => updateData(clientData)}>Go To Client Page</Button>
    </div>
  );
}
