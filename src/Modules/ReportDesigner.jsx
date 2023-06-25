import { Designer } from "@grapecity/activereports-react";
import { useEffect, useRef } from "react";
import "./Styles/Designer.css";
import report from "../utils/Report.json";
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
  const modal = useModal();
  const navigate = useNavigate();
  const {user} = useUser();

  useEffect(() => {
    designerRef.current.setReport(newFile);
  }, []);

  //open new report
  const openReport = () => {
    //Open a modal with all the saved file in it
    dispatchModal({type: MODAL_ACTION.OPEN_FILES})
  };

  //Save the new report
  const onSave = async (newReport) => {
    console.log(JSON.stringify(newReport));
    
    //Check if the report being saved is a new report or an old one
    if (newReport.displayName === "NewFile")
      //if it's a new report
      {//set unique report id
      newReport.id = user.files.length.toString();
      debugger
      await asyncDispatchModal({ type: MODAL_ACTION.SAVE_NEW_FILE, payload: newReport });}
    else {
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
        newReport = response.data.files.find((file)=> file.id === newReport.id);
    }

    newReport = user.files[user.files.length - 1];
    return Promise.resolve({ id: newReport.id, displayName: newReport.displayName });
  };

  //to view the report in the viewer
  const onReportPreview = (modifiedReport) => {
    navigate(`/Viewer?id=${modifiedReport}`);
  };
  return (
    <div id="designer-host">
      <Designer
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
