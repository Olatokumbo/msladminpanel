import React from "react";
import { Box } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useField, useFormikContext } from "formik";

const CheckBoxGroup = (inputs) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(inputs.name);
  const handleChange = (e) => {
    const { checked } = e.target;
    setFieldValue(inputs.name, checked);
  };

  const configCheckBox = {
    ...field,
    type: "checkbox",
    onChange: handleChange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        sx={{ m: 3 }}
        component="fieldset"
        variant="standard"
        {...configFormControl}
      >
        <FormLabel>Services Done</FormLabel>
        <FormGroup>
          {inputs.options.map((option) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    name={inputs.name}
                    value={option.value}
                    {...configCheckBox}
                  />
                }
                key={option.value}
                label={option.label}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default CheckBoxGroup;
