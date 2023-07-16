import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import HtmlIcon from "@mui/icons-material/Html";
import PrintIcon from "@mui/icons-material/Print";
import InfoIcon from "@mui/icons-material/Info";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import BrushIcon from "@mui/icons-material/Brush";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function SideDrawer({
  enableFullScreen,
  print,
  exportPdf,
  exportHTML,
  openFile,
  id
}) {
  const [open, setOpen] = React.useState(false);
  const [accordion, setAccordion] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setAccordion(false);
  };

  const handleAccordionChange = () => setAccordion((prev) => !prev);

  const handleClick = (e) => {
    switch (e.currentTarget.getAttribute("name")) {
      case "Open":
        openFile(true);
        break;
      case "Print":
        print();
        break;
      case "Download Pdf":
        exportPdf();
        break;
      case "Download Html":
        exportHTML();
        break;
      case "Full Screen":
        enableFullScreen();
        break;
      case "Designer":
        navigate(`/Designer?id=${id.current}`);
        break;
      case "Exit to Home":
        navigate("/");
        break;
      default:
    }
  };

  useEffect(()=>{
    let url = new URLSearchParams(window.location.search);
    let fileId = url.get("id");

    const handlePopState=()=>{
      navigate(`/Designer?id=${id.current}`);
    }

    if (fileId !== null) {
    window.addEventListener('popstate', handlePopState);
    }

    if (fileId !== null) 
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
    
  })


  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "lightsteelblue",
          color: "#000066",
          borderColor: "#000066"
        },
      }}
    >
      <DrawerHeader>
        {open ? (
          <IconButton color="inherit" onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider color="#000066" />
      <List>
        {["Open", "Print", "Download Pdf", "Download Html"].map(
          (text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                name={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={handleClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    color: "#000066",
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {[
                    <FileOpenIcon key={text} />,
                    <PrintIcon key={text} />,
                    <PictureAsPdfIcon key={text} />,
                    <HtmlIcon key={text} />,
                  ].map(
                    // eslint-disable-next-line
                    (element, i) => {
                      if (index === i) return element;
                    }
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider color="#000066" />
      <List sx={{ position: "absolute", bottom: "5px" }}>
        {["Full Screen", "Designer", "Exit to Home"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              name={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: "#000066",
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {[
                  <FullscreenIcon key={text} />,
                  <BrushIcon key={text} />,
                  <ExitToAppIcon key={text} />,
                ].map(
                  // eslint-disable-next-line
                  (element, i) => {
                    if (index === i) return element;
                  }
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem key={"Info"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            name={"Info"}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={handleClick}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: "#000066",
                mr: open ? 3 : "auto",
                justifyContent: "center",
                display: open ? "none" : "",
              }}
            >
              <InfoIcon key={"Info"} />
            </ListItemIcon>

            <Accordion
              expanded={accordion}
              onChange={handleAccordionChange}
              sx={{
                opacity: open ? 1 : 0,
                backgroundColor: "lightsteelblue",
                color: "#000066",
                padding: 0,
                margin: 0,
                boxShadow: "none", // Remove the shadow
                border: "none", // Remove the border
                transition: "background-color 0.08s ", // Set transition property and duration
                "&:hover": {
                  backgroundColor: "#A9BCD5", // Change background color on hover
                },
              }}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ padding: 0, margin: 0 }}
              >
                <InfoIcon key={"Info"} />
                <Typography sx={{ pl: "1.5em" }}>Info</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0.5em" }}>
                <Typography
                  sx={{
                    width: "12em",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                  }}
                >
                  This is the viewer where files created with the designer can
                  be viewed and downloaded in various preferred file formats.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideDrawer;
