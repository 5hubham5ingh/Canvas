import Box from "@mui/material/Box";
import { Core, HtmlExport } from "@grapecity/activereports";
import SideDrawer from "./SideDrawer";
import "./Styles/Viewer.css";
import { useEffect, useRef, useState } from "react";
import { parse as parseNode } from "node-html-parser";
import parse from "html-react-parser";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useReactToPrint } from "react-to-print";
import report from "./../utils/Report.json";

export default function ReportViewer() {
  const [Report, setReport] = useState(report[0]);

  useEffect(() => {
    let url = new URLSearchParams(window.location.search);
    let fileString = url.get("file");
    if (fileString !== null) setReport(JSON.parse(fileString));
  });
  debugger;
  // const Report = report[0];
  const pdfExportSettings = {
    title: "Invoice",
    author: "Gstcafe",
    keywords: "export, report",
    subject: "Report",
    pdfVersion: "2.0",
  };

  const [result, setResult] = useState();
  const exportRef = useRef();
  const invoiceRef = useRef();

  useEffect(() => {
    //function definition to create html report from Report received as prop
    async function loadReport() {
      //create new active report js report
      const report = new Core.PageReport();

      //load the Report received as prop into the new report
      await report.load(Report.definition);

      //create a doc of the report
      const doc = await report.run();

      //create html report from the report doc
      const result = await HtmlExport.exportDocument(doc, pdfExportSettings);

      //set the newly modified html as result
      setResult(() => {
        //get the root of newly crated html report
        const root = parseNode(result.data);

        //remove watermark by adding ".arjs-textBoxItem span{ display: none}" css class to the body inside <head>
        root.getElementsByTagName("style")[0].innerHTML = `body { 
          margin: 0pt;
				padding: 0pt;
			}
			 .arjs-reportPage {
				page-break-after: always;
			}
			@page {
				margin: 0mm;
			}
			.arjs-textBoxItem span{
				display:none;
			}`;

        result.data = root;
        return result;
      });
    }

    //call the function to load the Report received as prop and modify it to remove the watermark
    loadReport();
  }, []);

  // npm PDFexport
  const ExportPdf = () => {
    // document.getElementById("report").style = { display: "block" };
    if (exportRef.current) {
      console.log("Xref.current:", exportRef.current);
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

  return (
    <Box sx={{ display: "flex" }}>
      <SideDrawer
        enableFullScreen={enableFullScreen}
        print={print}
        exportPdf={ExportPdf}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "white",
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
          "Report doesn't exits."
        )}
      </Box>
    </Box>
  );
}
