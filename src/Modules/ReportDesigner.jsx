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
  
  const designerRef = useRef();
  const snackbar = useSnackBar();
  const { asyncDispatchModal, dispatchModal } = useModal();

  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    let url = new URLSearchParams(window.location.search);
    let fileId = url.get("id");
    if (fileId !== null && fileId !== undefined ) {
      try {
        let fileString = sessionStorage.getItem(fileId);
        designerRef.current.setReport(JSON.parse(fileString));
      } catch (e) {
        
      }
    }
    else 
    designerRef.current.setReport(newFile);
   
  }, []);

  //open new report
  const openReport = () => {
    //Open a modal with all the saved file in it
    dispatchModal({ type: MODAL_ACTION.OPEN_FILES, payload: designerRef });
  };

//save new file
const saveNewFile = async (newFile) => {
  const fileName = sessionStorage.getItem("fileName");
  
  if (fileName !== null) {
    sessionStorage.removeItem("fileName");
    return Promise.resolve({
      id: newFile.id,
      displayName: fileName,
    });
  } else {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await saveNewFile(newFile);
        resolve(result);
      }, 1000);
    });
  }
};

//Save the file
const onSave = async (newReport) => {

  let id = 0;
  //Check if the report being saved is a new report or an old one
  if (newReport.displayName === "NewFile") {
    //if it's a new report
    //set unique report id
    user.files.forEach((file)=>id += parseInt(file.id));
    newReport.id = id;     
    await asyncDispatchModal({
      type: MODAL_ACTION.SAVE_NEW_FILE,
      payload: newReport,
    });
    return await saveNewFile(newReport);
    
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
    id: newReport.id,
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
        onCreate={()=> Promise.resolve({...newFile})}
      />
    </div>
  );
}

export default ReportDesigner;
