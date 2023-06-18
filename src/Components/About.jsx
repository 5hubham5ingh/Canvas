import { GitHub, Link, Twitter } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

export default function About() {
  const openTwitter = () => window.open("https://twitter.com/5hubham_Singh", "newWindow");
  const openGitHub = () => window.open("https://github.com/5hubham5ingh", "newWindow");
  return (
    <Box
      sx={{
        position: "relative",
        color: "#ADD8E6",
        backgroundImage:
          "linear-gradient(transparent,black,black, black, black)",
        top: "200vh",
        width: "100%",
      }}
    >
      <Typography paragraph p={2} pb={0} pt={4} id={"about"}>
        This application is designed only for demonstrative and educational
        purposes. It can be used to design no-code HTML, pdf and excel files,
        and generate reports for data visualization, all from single file
        source.
      </Typography>
      <Stack direction="row" p={0} pr={2} justifyContent={"right"} alignItems={"center"}>
        Developer :-
        <IconButton variant="contained" color="white" onClick={openTwitter}>
          <Twitter sx={{ color: "#1DA1F2" }} />
          <Typography color="white">@5hubhamSingh</Typography>
        </IconButton>
        <IconButton variant="contained" onClick={openGitHub}>
          <GitHub sx={{ color: "white" }} />
          <Typography color={"white"}>5hubham5ingh</Typography>
        </IconButton>
      </Stack>
    </Box>
  );
}
