import { GitHub, Twitter } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

export default function About() {
  const openTwitter = () => alert("dasas");
  const openGitHub = () => window.open();
  return (
    <Box
      sx={{
        position: "relative",
        color: "aqua",
        backgroundImage: "linear-gradient(transparent, black, black)",
        top: "200vh",
        width: "100%",
      }}
    >
      <Typography paragraph p={2} id={"about"}>
        This application is designed only for demonstrative and educational
        purposes. It can be used to design no-code HTML, pdf and excel files,
        and generate reports for data visualization, all from single file
        source.
        <Stack direction="row" p={2}>
          Creator's socials :-
          <IconButton variant="contained" color="white" onClick={openTwitter}>
            <Twitter color="blue" />
            <Typography color="white">@5hubhamSingh</Typography>
          </IconButton>
          <IconButton variant="contained" onClick={openGitHub}>
            <GitHub />
            <Typography>5hubham5ingh</Typography>
          </IconButton>
        </Stack>
      </Typography>
    </Box>
  );
}
