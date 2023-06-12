import { Box, Typography } from "@mui/material";
import React from "react";

export default function About() {
  return (
    <Box
      sx={{
        position: "absolute",
        color: "aqua",
        backgroundImage: "linear-gradient(transparent, black, black)",
        top: "210vh",
        width: "100%",
      }}
    >
      <Typography paragraph p={2} id={"about"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque
        dicta, ea asperiores, eligendi nobis error ex magnam atque, ab
        voluptatibus consequuntur dolores minus repellat! Architecto magnam
        quaerat dignissimos illo. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Sapiente aliquam rem voluptate. Eaque nesciunt officia
        modi molestiae delectus, minus odio placeat nam necessitatibus, itaque
        commodi et in nobis ducimus. Soluta?
      </Typography>
    </Box>
  );
}
