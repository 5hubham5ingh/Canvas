import * as React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default function SignUpNLogInTab({ tab }) {
  const [value, setValue] = React.useState(tab);

  // React.useEffect(() => {
  //   setValue(tab);
  // }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <TabPanel value="logIn">
          <LogIn setTab={setValue} />
        </TabPanel>
        <TabPanel value="signUp">
          <SignUp setTab={setValue} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
