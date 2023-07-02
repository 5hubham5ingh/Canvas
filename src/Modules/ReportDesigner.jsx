import { Designer } from "@grapecity/activereports-react";
import { useEffect, useRef } from "react";
import "./Styles/Designer.css";
import { MethodType, RequestType, sendRequest } from "../Server/server";
import { useModal } from "../Modules/modal/Modal";
import { ACTION as MODAL_ACTION } from "../Modules/modal/Action";
import { RESPONSE } from "../Server/responce";
import { ACTION } from "./snackbar/Actions";
import { useNavigate } from "react-router-dom";
import newFile from "../utils/newFile.json";
import { useSnackBar } from "./snackbar/SnackBar";
import { useUser } from "./User/userContext";

function ReportDesigner() {
  console.log("designer renders");
  const designerRef = useRef();
  const snackbar = useSnackBar();
  const { asyncDispatchModal, dispatchModal } = useModal();

  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    let workingFile = sessionStorage.getItem("NewFile");
    if (workingFile === null) designerRef.current.setReport(newFile);
    else designerRef.current.setReport(JSON.parse(workingFile));
  }, []);

  //open new report
  const openReport = () => {
    //Open a modal with all the saved file in it
    dispatchModal({ type: MODAL_ACTION.OPEN_FILES, payload: designerRef });
  };

  //Save the new report
  const onSave = async (newReport) => {
    console.log(JSON.stringify(newReport));

    //Check if the report being saved is a new report or an old one
    if (newReport.displayName === "NewFile") {
      //if it's a new report
      //set unique report id
      newReport.id = user.files.length.toString();
      
      await asyncDispatchModal({
        type: MODAL_ACTION.SAVE_NEW_FILE,
        payload: newReport,
      });
    } else {
      // else if it's an old report
      const response = sendRequest(
        MethodType.PUT,
        RequestType.SAVE_FILE,
        newReport
      );
      //if file saved successfully
      if (response.status === RESPONSE.FILE_SAVED_SUCCESSFUL)
        snackbar.dispatch(ACTION.FILE_SAVED);

      //set the new file from db
      newReport = response.data.files.find((file) => file.id === newReport.id);
    }

   
    return Promise.resolve({
      id: "0",
      displayName: newReport.displayName,
    });
  };

  //to view the report in the viewer
  const onReportPreview = (modifiedReport) => {
    const modifiedFile = JSON.stringify(modifiedReport);
    try {
      sessionStorage.setItem(modifiedReport.id, modifiedFile);
      navigate(`/Viewer?id=${modifiedReport.id}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div id="designer-host">
      <Designer
        // dataSources={dataSources}
        onSave={onSave}
        ref={designerRef}
        onRender={onReportPreview}
        onOpen={openReport}
      />
    </div>
  );
}

export default ReportDesigner;
