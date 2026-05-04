
import { useState } from "react";

function Statuses(){
    const [statusID, setStatusID] = useState("");
    const [statusDate, setStatusDate] = useState("");
    return(
        <>
            <label htmlFor="statusID">statusID</label>
            <input name = "statusID" type="text" value={statusID} onChange={setStatusID}/>
            <label htmlFor="statusName">status</label>
            <input name = "statusName "type="text" value={statusDate} onChange={setStatusDate} />
        </>
    )
};

export default Statuses;