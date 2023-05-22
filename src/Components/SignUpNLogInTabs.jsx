import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { Button } from "@mui/material";

export default function SignUpNLogInTab() {
  const [value, setValue] = React.useState("LogIn");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <TabPanel value="LogIn">
          <LogIn setTab={setValue} />
        </TabPanel>
        <TabPanel value="SignUp">
          <SignUp setTab={setValue} />
        </TabPanel>
        {/* <Button variant="contained" onClick={() => setValue("SignUp")}></Button> */}
      </TabContext>
    </Box>
  );
}
