import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUser } from "../../User/userContext";
import { useModal } from "../Modal";
import { ACTION } from "../Action";
import { MethodType, RequestType, sendRequest } from "../../../Server/server";
export default function OpenFiles({ open }) {
  const { user } = useUser();
  const { dispatchModal } = useModal();
  const files = user.files;

  const openFile = (fileId) => {
    const file = files.find((file) => file.id === fileId);

    open.current.setReport(file);
    dispatchModal({ type: ACTION.CLOSE });
  };

  const deleteFile = (fileId) => {
    const response = sendRequest(
      MethodType.DELETE,
      RequestType.DELETE_FILE,
      fileId
    );
  };
  return (
    <>
      <Stack direction="column">
        <Typography pl={"0.5em"} variant="h6">
          Open file
        </Typography>
        <Divider color="#1DA1F2" />

        <List>
          {files.length > 0 ? (
            files.map((file) => (
              <Stack direction="row" alignItems={"center"}>
                <ListItemButton
                  key={file.id}
                  name={file.id}
                  component="a"
                  onClick={() => openFile(file.id)}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary={file.displayName} />
                </ListItemButton>
                <DeleteIcon
                  sx={{
                    color: "grey",
                    "&:hover": {
                      color: "black", // Define the hover color
                    },
                  }}
                  key={file.id}
                  onClick={() => alert(file.id)}
                />
              </Stack>
            ))
          ) : (
            <Typography pl={"0.5em"} paragraph color={"red"}>
              No file exists.
            </Typography>
          )}
        </List>
      </Stack>
    </>
  );
}
