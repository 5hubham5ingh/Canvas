import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useUser } from "../../User/userContext";

export default function OpenFiles() {
  debugger;
  const { user } = useUser();
  const files = user.files;
  const handleClick = (e) => {
    console.log(e);
  };
  return (
    <>
      <Stack direction="column">
        {/* {files.map((file, index) => (
          <span key={file.id} name={file.id} onClick={handleClick}>
            {"📜" + file.displayName}
          </span>
        ))} */}
        <List>
          {files.map((file) => (
            <List>
              {files.map((file) => (
                <ListItemButton
                  key={file.id}
                  component="a"
                  onClick={handleClick}
                >
                  <ListItemIcon>📜</ListItemIcon>
                  <ListItemText primary={file.displayName} />
                </ListItemButton>
              ))}
            </List>
          ))}
        </List>
      </Stack>
    </>
  );
}
