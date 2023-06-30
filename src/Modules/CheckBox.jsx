import { Checkbox, FormControlLabel } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

function CheckBox(props, ref) {
  const [check, setCheck] = useState(false);
  console.log("checkBox");
  useImperativeHandle(ref, () => {
    return check;
  });

  return (
    <FormControlLabel
      control={
        <Checkbox
          size="small"
          checked={check}
          onChange={() => setCheck(!check)}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label="Keep me logged in."
    />
  );
}

export default forwardRef(CheckBox);
