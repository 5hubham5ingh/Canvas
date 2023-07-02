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
import { useUser } from "../../User/userContext";
import { useModal } from "../Modal";
import { ACTION } from "../Action";
export default function OpenFiles({ open }) {
  const { user } = useUser();
  const { dispatchModal } = useModal();
  const files = user.files;
  const openFile = (fileId) => {
    const file = files.find((file) => file.id === fileId);

    open.current.setReport(file);
    dispatchModal({ type: ACTION.CLOSE });
  };
  return (
    <>
      <Stack direction="column">
        <Typography pl={"0.5em"} variant="h6">Open file</Typography>
        <Divider color="#1DA1F2" />

        <List>
          {files.length > 0 ? files.map((file) => (
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
          )) : <Typography pl={"0.5em"} paragraph color={"red"}>No file exists.</Typography>}
        </List>
      </Stack>
    </>
  );
}
