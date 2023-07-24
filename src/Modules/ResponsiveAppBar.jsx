import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSnackBar } from "./snackbar/SnackBar";
import { useModal } from "./modal/Modal";
import { useUser } from "./User/userContext";
import { ACTION as snackbarAction } from "./snackbar/Actions";
import { ACTION as modalAction } from "./modal/Action";
import { Stack } from "@mui/material";

const drawerWidth = 240;


function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const snackbar = useSnackBar();
  const { dispatchModal } = useModal();
  const { user, setUser } = useUser();
  const userOnlyButtons = ["Designer", "Viewer", "Logout", "About"];
  const visitorOnlyButtons = ["LogIn", "SignUp", "About"];
  const navItems = user === undefined ? visitorOnlyButtons: userOnlyButtons;

  const handleClick = (button) => {
   
    switch (button.target.name) {
      case "Designer":
        navigate("/designer");
        break;
      case "Viewer":
        navigate("/viewer");
        break;
      case "LogIn":
        dispatchModal({ type: modalAction.OPEN_LOGIN });
        break;
      case "SignUp":
        dispatchModal({ type: modalAction.OPEN_SIGNUP });
        break;
      case "About":
        const element = document.getElementById("About");
        element.scrollIntoView({ behavior: "smooth" });
        break;
      case "Logout":
        setUser(undefined);
        snackbar.dispatch(snackbarAction.LOGGED_OUT);
        sessionStorage.removeItem(user.accountName);
        break;

      default:
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", color:"aqua",  }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <Stack direction="column" textAlign="center">
        {navItems.map((item) => (
      <>
      <Divider key={item + "Divider"} color="aqua" sx={{margin:"0.2vh"}}/>
            <Button key={item}  onClick={handleClick} name={item} sx={{ textAlign: "center" ,color:"aqua"}}>
             {item}
            </Button>
          
      </>
        ))}
      </Stack>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed"
        color="transparent"
        sx={{
          backgroundImage: "linear-gradient(black, transparent)",
        }}
        elevation={0}
      >
        <Toolbar>
         
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {  sm: "block" }, color:"aqua" }}
          >
            Canvas
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => {
                let mr = "2vw";
                if (item === "About") mr = 0;
              return (<Button key={item} name={item} onClick={handleClick} sx={{ color: "aqua",marginRight: mr }}>
                {item}
              </Button>)
})}
          </Box>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color:"aqua" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "flex", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundImage: "linear-gradient(black, #202433)",
             
            },
           
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
