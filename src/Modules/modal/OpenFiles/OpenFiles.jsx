import { List, ListItem, ListItemText, Stack } from "@mui/material";
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
            <ListItem
              button
              component="a"
              href={file.id}
              key={file.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary={file.displayName} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
}
