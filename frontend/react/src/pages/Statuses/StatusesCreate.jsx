
import { useState } from "react";
import { useNavigate } from "react-router";
import { createStatuses } from "../../components/apiClient";

function StatusesCreate(){
    const [statusID, setStatusID] = useState();
    const [statusName, setStatusName] = useState();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        const ID = -1;
        e.preventDefault();
        const status = {ID, statusName};
        createStatuses(status);
        navigate("/statuses")


    }
    return(
        <div className='main'>
            <h1>Add Statuses</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="statusID">statusID</label>
                <input name = "statusID" type="text" value={statusID} onChange={e => setDescription(e.target.value)}/> */}
                
                <div className="form-group">
                    <label htmlFor="statusName">status</label>
                    <input name = "statusName "type="text" value={statusName} onChange={e => setStatusName(e.target.value)} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
};

export default StatusesCreate;