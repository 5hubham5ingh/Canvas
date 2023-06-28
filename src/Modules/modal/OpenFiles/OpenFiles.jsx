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
import { useNavigate } from "react-router-dom";
export default function OpenFiles({ open, For }) {
  const { user } = useUser();
  const { dispatchModal } = useModal();
  const navigate = useNavigate();
  const files = user.files;
  const openFile = (fileId) => {
    const file = files.find((file) => file.id === fileId);

    if (For === "designer") {
      open.current.setReport(file);
      dispatchModal({ type: ACTION.CLOSE });
    } else {
      navigate(`/Viewer?id=${fileId}`);
    }
  };
  return (
    <>
      <Stack direction="column">
        <Typography pl={"1em"}>Open file</Typography>
        <Divider color="#1DA1F2" />

        <List>
          {files.map((file) => (
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
          ))}
        </List>
      </Stack>
    </>
  );
}
