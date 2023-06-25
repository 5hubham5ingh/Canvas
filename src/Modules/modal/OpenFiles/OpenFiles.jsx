import { Stack } from "@mui/material";
import { useUser } from "../../User/userContext";

export default function OpenFiles(){
    debugger
    const {user} = useUser();
const files = user.files;
const handleClick=(e)=>{
    console.log(e.target.name)
}
    return (<>
    <Stack direction="row">
{
    files.map((file,index)=> <span key={index} name={file.id} onClick={handleClick}>{file.displayName}</span>)
}
    </Stack>
    </>)
}