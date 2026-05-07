
import { useState } from "react";
import { useNavigate } from "react-router";


function StatusesEdit({status}){
    const navigate = useNavigate();
    const [statusID, setStatusID] = useState(status.statusID);
    const [statusName, setStatusName] = useState(status.statusName);
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <div className='main'>
            <h1>Edit Statuses</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="statusID">statusID</label>
                <input name = "statusID" type="text" value={statusID} onChange={setStatusID}/>

                <label htmlFor="statusName">status</label>
                <input name = "statusName "type="text" value={statusName} onChange={setStatusName} />

                <button type="submite">Save</button>
            </form>
        </div>
    )
};

export default StatusesEdit;