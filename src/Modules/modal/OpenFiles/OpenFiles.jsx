import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useUser } from "../../User/userContext";
export default function OpenFiles({ref}) {
  debugger;
  const { user } = useUser();
  const files = user.files;
  const openFile = (fileId) => {
 
    const file = files.find((file)=> file.id === fileId)
    

    ref.current.setFile(file);
  };
  return (
    <>
      <Stack direction="column">
        <Typography pl={"1em"} heading>
          Open file
        </Typography>
        <Divider color="#1DA1F2" />

        <List>
          {files.map((file) => (
            <ListItemButton key={file.id} name={file.id} component="a" onClick={()=>openFile(file.id)}>
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
