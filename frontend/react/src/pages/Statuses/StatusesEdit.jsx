
import { useState } from "react";

function StatusesEdit({status}){
    const [statusID, setStatusID] = useState(status.statusID);
    const [statusName, setStatusName] = useState(status.statusName);
    return(
        <>
            <form>
                <label htmlFor="statusID">statusID</label>
                <input name = "statusID" type="text" value={statusID} onChange={setStatusID}/>
                <label htmlFor="statusName">status</label>
                <input name = "statusName "type="text" value={statusName} onChange={setStatusName} />
                <button>Save</button>
            </form>
        </>
    )
};

export default StatusesEdit;