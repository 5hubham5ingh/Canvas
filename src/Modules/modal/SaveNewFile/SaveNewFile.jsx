import React, { useRef, useState } from "react";
import { MethodType, RequestType, sendRequest } from "../../../Server/server";
import { Button, TextField } from "@mui/material";
import { ERROR } from "../../../Server/error";
import { useSnackBar } from "../../snackbar/SnackBar";
import { ACTION as SNACKBAR_ACTION } from "../../snackbar/Actions";
import { useModal } from "../Modal";
import { ACTION as MODAL_ACTIONS } from "../Action";
import { useFormik } from "formik";
import { useUser } from "../../User/userContext";
function SaveNewFile({ file }) {
  const { dispatch } = useSnackBar();
  const { dispatchModal } = useModal();
  const [error,setError] = useState();
  const [user,setUser] = useUser();
  const nameRef = useRef();

  const saveFile = () => {
    const response = sendRequest(MethodType.POST, RequestType.SAVE_FILE, file);
    if (response.status === ERROR.PREEXISTING_FILE)
      dispatch(SNACKBAR_ACTION.PREEXISTING_FILE);
    else {
      dispatch(SNACKBAR_ACTION.FILE_SAVED);
      dispatchModal(MODAL_ACTIONS.CLOSE);
    }
  };
 
  const validateFileName=(e)=>{
const fileName = e.target.value;
user.files.find((file)=>{
fileName === file.id || fileName === file.
})
  }

  return (
    <form>
      <TextField
        ref={nameRef}
        name="fileName"
        onBlur={validateFileName}
        onChange={validateFileName}
        error={Boolean(error)}
        helperText={error}
        label="File Name"
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
    </form>
  );
}

export default SaveNewFile;
