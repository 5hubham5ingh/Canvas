import React, { useRef, useState } from "react";
import { MethodType, RequestType, sendRequest } from "../../../Server/server";
import { Button, TextField } from "@mui/material";
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
  const [user, setUser] = useUser();
  const nameRef = useRef();

  const saveNewFile = () => {
    if (!error) {
      const fileName = nameRef.current.target.value;

      file.id = fileName;
      file.displayName = fileName;

      const response = sendRequest(
        MethodType.POST,
        RequestType.SAVE_FILE,
        file
      );
      if (response.status === ERROR.PREEXISTING_FILE)
        dispatch(SNACKBAR_ACTION.PREEXISTING_FILE);
      else if (response.status === RESPONSE.FILE_SAVED_SUCCESSFUL) {
        setUser(response.data);
        dispatch(SNACKBAR_ACTION.FILE_SAVED);
        dispatchModal(MODAL_ACTIONS.CLOSE);
      }
    }
  };

  const validateFileName = () => {
    const fileName = nameRef.current.target.value;
    const preExistingFile = user.files.find(
      (file) => fileName === file.id || fileName === file.displayName
    );
    if (preExistingFile !== null)
      setError("File name already exists, please choose another");
  };

  const overrideExistingFile = () => {
    const fileName = nameRef.current.target.value;

    file.id = fileName;
    file.displayName = fileName;

    const response = sendRequest(MethodType.PUT, RequestType.SAVE_FILE, file);
    if (response.status === RESPONSE.FILE_SAVED_SUCCESSFUL) {
      setUser(response.data);
      dispatch(SNACKBAR_ACTION.FILE_SAVED);
      dispatchModal(MODAL_ACTIONS.CLOSE);
    }
  };

  return (
    <form>
      <TextField
        ref={nameRef}
        name="fileName"
        onBlur={validateFileName}
        error={Boolean(error)}
        helperText={error}
        label="File Name"
        fullWidth
      />
      {Boolean(error) ? (
        <Button variant="contained" onClick={overrideExistingFile}>
          Override existing file
        </Button>
      ) : (
        <Button variant="contained" onClick={saveNewFile}>
          Save
        </Button>
      )}
    </form>
  );
}

export default SaveNewFile;
