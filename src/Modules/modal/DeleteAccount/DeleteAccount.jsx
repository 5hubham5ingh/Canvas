import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react"
import { MethodType, RequestType, sendRequest } from "../../../Server/server";
import { RESPONSE } from "../../../Server/responce";
import { useSnackBar } from "../../snackbar/SnackBar";
import { ACTION } from "../../snackbar/Actions";
import { useUser } from "../../User/userContext";



function DeleteAccount({account,closeModal}) {
    const [deleteAccount, setDeleteAccount]= useState(false);
    const snackbar = useSnackBar();
    const {setUser}= useUser();
  
    if(deleteAccount){
        const response = sendRequest(MethodType.DELETE, RequestType.DELETE_ACCOUNT,account);
        if(response.status === RESPONSE.ACCOUNT_DELETED){
            closeModal();
        snackbar.dispatch(ACTION.ACCOUNT_DELETED);
        setUser(undefined);

    }
        
    }

    return (<Stack direction="column">
    <Typography variant="h6">Are you sure you want to delete your account?</Typography>
    <Stack direction="row">
    <Button size="small" onClick={()=> setDeleteAccount(true)}>Yes</Button>
    <Button size="small" onClick={()=> closeModal()}>no</Button>
    </Stack>
    </Stack>)
}

export default DeleteAccount