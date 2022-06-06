import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { db } from "../../../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useFormikContext } from "formik";

export function ProductsTags() {
  const [products, setProducts] = useState([]);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list = [];
        snapShot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setProducts(list);
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
        multiple
        id="tags-outlined"
        onChange={(event, value) => {
          setFieldValue("productsBought", value);
        }}
        options={products}
        getOptionLabel={(option) => option.brand + " " + option.name}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Products Bought" />
        )}
      />
    </div>
  );
}

export default ProductsTags;
