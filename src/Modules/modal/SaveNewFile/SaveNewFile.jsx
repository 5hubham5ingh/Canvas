import React, { useRef, useState } from "react";
import { MethodType, RequestType, sendRequest } from "../../../Server/server";
import { Button, Grid, TextField } from "@mui/material";
import { ERROR } from "../../../Server/error";
import { useSnackBar } from "../../snackbar/SnackBar";
import { ACTION as SNACKBAR_ACTION } from "../../snackbar/Actions";
import { useModal } from "../Modal";
import { ACTION as MODAL_ACTIONS } from "../Action";
import { useUser } from "../../User/userContext";
import { RESPONSE } from "../../../Server/responce";

function SaveNewFile({ file }) {
  const { dispatch } = useSnackBar();
  const { dispatchModal } = useModal();
  const [error, setError] = useState(false);
  const { user, setUser } = useUser();
  const nameRef = useRef();
  const [value, setValue] = useState(file.displayName);

  const saveNewFile = () => {
    const fileName = value;

    //validation the filename
    const preExistingFile = user.files.find(
      (file) =>  fileName === file?.displayName
    );
    if (preExistingFile !== undefined) {
      setError("File name already exists, please choose another");
      return;
    }
    else if(fileName === "NewFile"){
    setError("File name can't be New File, please enter different file name.");
  return;}

    //If validation succeed
    file.id = user.files.length.toString();
    file.displayName = fileName;
    debugger;
    const response = sendRequest(MethodType.POST, RequestType.SAVE_FILE, file);
    if (response.status === ERROR.PREEXISTING_FILE)
      dispatch(SNACKBAR_ACTION.PREEXISTING_FILE);
    else if (response.status === RESPONSE.FILE_SAVED_SUCCESSFUL) {
      debugger
      setUser(response.data);
      dispatch(SNACKBAR_ACTION.FILE_SAVED);
      sessionStorage.setItem("fileName",value);
      dispatchModal({type: MODAL_ACTIONS.CLOSE});
    }
  };

  const overrideExistingFile = () => {
    const fileName = value;
    file.id = user.files.length;
    file.displayName = fileName;

    const response = sendRequest(MethodType.PUT, RequestType.SAVE_FILE, file);
    if (response.status === RESPONSE.FILE_SAVED_SUCCESSFUL) {
      setUser(response.data);
      dispatch(SNACKBAR_ACTION.FILE_SAVED);
      sessionStorage.setItem("fileName",value);
      dispatchModal({type:MODAL_ACTIONS.CLOSE});
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={nameRef}
          name="fileName"
          error={Boolean(error)}
          helperText={error}
          label="File Name"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        {(error === "File name already exists, please choose another")? (
          <Button sx={{
            backgroundColor: "lightsteelblue",
            float: "right",
            borderRadius: "10px",
            color: "black",
            "&:hover": { backgroundColor: "#1DA1F2", color: "white" },
          }}
          size="small" variant="contained" onClick={overrideExistingFile}>
            Override existing file
          </Button>
        ) : ""}
          <Button
            sx={{
              backgroundColor: "lightsteelblue",
              float: "right",
              borderRadius: "10px",
              color: "black",
              "&:hover": { backgroundColor: "#1DA1F2", color: "white" },
            }}
            size="small"
            variant="contained"
            onClick={saveNewFile}
          >
            Save
          </Button>
      </Grid>
    </Grid>
  );
}

export default SaveNewFile;
