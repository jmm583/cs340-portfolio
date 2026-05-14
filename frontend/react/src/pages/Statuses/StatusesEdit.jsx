
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
              
                <div className="form-group">
                    <label htmlFor="statusID">statusID</label>
                    <input name = "statusID" type="text" value={statusID} onChange={setStatusID}/>
                </div>
                <div className="form-group">
                    <label htmlFor="statusName">status</label>
                    <input name = "statusName "type="text" value={statusName} onChange={setStatusName} />
                </div>
                <div className="form-group actions">
                    <button type="submite">Save</button>
                </div>
            </form>
        </div>
    )
};

export default StatusesEdit;