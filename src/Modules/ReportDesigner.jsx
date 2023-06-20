import { Designer } from "@grapecity/activereports-react";
import { useRef } from "react";
import "./Styles/Designer.css";
import report from "../utils/Report.json";
import { MethodType, RequestType, sendRequest } from "../Server/server";
import { useModal } from "../Components/modal/Modal";
import { ACTION as MODAL_ACTION } from "../Components/modal/Action";

function ReportDesigner() {
  const designerRef = useRef();
  const { dispatchModal } = useModal();

  //open new report
  const openReport = () => {
    designerRef.current.setReport(report);
  };

  //Save the new report
  const onSave = (newReport) => {
    console.log(newReport);
    if (newReport.id === undefined && newReport.displayName === "Untitled")
      dispatchModal({ type: MODAL_ACTION.SAVE_NEW_FILE, payload: newReport });

    newReport.id = "newReport";

    return Promise.resolve({ id: newReport.id, displayName: newReport.id });
  };

  //to view the report in the viewer
  const onReportPreview = (modifiedReport) => {};
  return (
    <div id="designer-host">
      <Designer
        report={report}
        // dataSources={dataSources}
        onSave={onSave}
        onSaveAs={onSave}
        ref={designerRef}
        onRender={onReportPreview}
        onOpen={openReport}
      />
    </div>
  );
}

export default ReportDesigner;
