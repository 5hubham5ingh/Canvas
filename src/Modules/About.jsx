import { GitHub, Twitter } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUser } from "./User/userContext";
import { useModal } from "./modal/Modal";
import { ACTION } from "./modal/Action";

export default function About() {
  const { user } = useUser();
  const { dispatchModal } = useModal();

  const style = {
    color: "grey",
    fontSize: "5vw",
    "&:hover": {
      color: "white",
      transform: "scale(1.5)",
      transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out",
    },
  };

  const openTwitter = () =>
    window.open("https://twitter.com/5hubham_Singh", "newWindow");
  const openGitHub = () =>
    window.open("https://github.com/5hubham5ingh", "newWindow");

  const handleClick = () => {
    dispatchModal({ type: ACTION.DELETE_ACCOUNT, payload: user.accountName });
    debugger;
  };
  return (
    <Box
      p={2}
      pt={5}
      id="About"
      sx={{
        position: "relative",
        color: "#ADD8E6",
        backgroundImage:
          "linear-gradient(transparent,black,black, black, black)",

        width: "100%",
      }}
    >
      <Typography variant="h6" pl={1}>
        About
      </Typography>
      <Divider color="#1DA1F2" width="97%" sx={{ marginY: "0.2em" }} />
      <Typography paragraph pl={1}>
        This application is designed only for demonstrative and educational
        purposes. It can be used to design no-code HTML, pdf and excel files,
        and generate reports for data visualization, all from single file
        source.
      </Typography>
      <Stack
        direction="row"
        p={0}
        pr={5}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Tooltip title="Developer's socials">
          <>
            <IconButton variant="contained" color="white" onClick={openTwitter}>
              <Twitter sx={{ ...style }} />
            </IconButton>
            <IconButton variant="contained" onClick={openGitHub}>
              <GitHub sx={{ ...style }} />
            </IconButton>
          </>
        </Tooltip>
        {user !== undefined && (
          <Button name={"deleteAccount"} onClick={handleClick}>
            <DeleteIcon sx={{ ...style }} />
          </Button>
        )}
      </Stack>
    </Box>
  );
}
