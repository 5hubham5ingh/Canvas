import Box from "@mui/material/Box";
import { Core, HtmlExport } from "@grapecity/activereports";
import SideDrawer from "./SideDrawer";
import "./Styles/Viewer.css";
import { useEffect, useRef, useState } from "react";
import { parse as parseNode } from "node-html-parser";
import parse from "html-react-parser";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useReactToPrint } from "react-to-print";
import report from "./../utils/noFile.json";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useUser } from "./User/userContext";

export default function ReportViewer() {
  const [Report, setReport] = useState(report[0]);
  const [result, setResult] = useState();
  const [open, setOpen] = useState(false);
  const exportRef = useRef();
  const invoiceRef = useRef();
  const { user } = useUser();
  const id =useRef();
  

  useEffect(() => {
    let url = new URLSearchParams(window.location.search);
    let fileId = url.get("id");
    if (fileId !== null) {
      try {
        id.current = fileId;
        let fileString = sessionStorage.getItem(fileId);
        setReport(JSON.parse(fileString));
      } catch (e) {
        console.log(e);
      }
    }

    window.addEventListener('popstate', handlePopstate);

    function handlePopstate(e){
      e.preventDefault();
      console.log("popped")
      let url = new URLSearchParams(window.location.search);
    let fileId = url.get("id");
    if (fileId !== null) {
      window.location.href = `/Designer?id=${fileId}`
    }}

    return()=>{ window.removeEventListener('popstate', handlePopstate)};
  }, []);


  //Prepare HTML
  useEffect(() => {

    const htmlExportSettings = {
      multiPage: false,
      title: "Design",
      author: "AJRS-Canvas",
      keywords: "export, report",
      subject: "Report",
      pdfVersion: "2.0",
    };

    //function definition to create html report from Report received as prop
    async function loadReport() {
      //create new active report js report
      const report = new Core.PageReport();

      //load the Report received as prop into the new report
      await report.load(Report.definition);

      //create a doc of the report
      const doc = await report.run();

      //create html report from the report doc
      const result = await HtmlExport.exportDocument(doc, htmlExportSettings);

      //set the newly modified html as result
      setResult( result);
    }

    //call the function to load the Report received as prop and modify it to remove the watermark
    loadReport();
  }, [Report]);

  // npm PDFexport
  const ExportPdf = () => {
    // document.getElementById("report").style = { display: "block" };
    if (exportRef.current) {
      
      exportRef.current.save("invoice");
    }
    // document.getElementById("report").style.display = "none";
  };

  // npm react-to-print
  const print = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Invoice",
  });

  const enableFullScreen = () => {
    if (invoiceRef.current) {
      if (invoiceRef.current.requestFullscreen) {
        invoiceRef.current.requestFullscreen();
      } else if (invoiceRef.current.mozRequestFullScreen) {
        invoiceRef.current.mozRequestFullScreen();
      } else if (invoiceRef.current.webkitRequestFullscreen) {
        invoiceRef.current.webkitRequestFullscreen();
      } else if (invoiceRef.current.msRequestFullscreen) {
        invoiceRef.current.msRequestFullscreen();
      }
    }
  };

  function exportHtml() {
    const divElement = document.getElementById("file");
    const divContent = divElement.outerHTML;

    const blob = new Blob([divContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = Report?.displayName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "lightsteelblue",
    opacity: "0.9",
    borderRadius: "30px",
    boxShadow: 24,
    p: 4,
  };

  const openFile = (fileId) => {
    const file = user.files.find((file) => file.id === fileId);
    setReport(file);
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <SideDrawer
        enableFullScreen={enableFullScreen}
        print={print}
        exportPdf={ExportPdf}
        exportHTML={exportHtml}
        openFile={setOpen}
        id={id}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="log-in"
        aria-describedby="log-in-page"
      >
        <Box sx={style}>
          <Stack direction="column">
            <Typography pl={"1em"}>Open file</Typography>
            <Divider color="#1DA1F2" />

            <List>
              {user.files.length > 0 ? user.files.map((file) => (
                <ListItemButton
                  key={file.id}
                  name={file.id}
                  component="a"
                  onClick={() => openFile(file.id)}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary={file.displayName} />
                </ListItemButton>
              )) : <Typography pl={"0.5em"} paragraph color={"red"}>No file exists.</Typography>}
            </List>
          </Stack>
        </Box>
      </Modal>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background:"#e1ebfc",
        }}
      >
        {result?.data !== undefined ? (
          <PDFExport
            title={Report.displayName}
            author="arjs-canvas"
            paperSize="A4"
            margin="0"
            scale={0.75}
            ref={exportRef}
          >
            <div
              id="file"
              style={{
                display: "flex",
                justifyContent: "center",
                
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
              ref={invoiceRef}
            >
              {parse(result.data.toString())}
            </div>
          </PDFExport>
        ) : (
          "Loading..."
        )}
      </Box>
    </Box>
  );
}

