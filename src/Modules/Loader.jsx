import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        display: " flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width:"100vw",
        backgroundImage: "linear-gradient(black, #202433)",
       
      }}
    >
      <CircularProgressWithLabel value={progress} />
    </div>
  );
};

export default Loader;

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div"  color="steelblue">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
