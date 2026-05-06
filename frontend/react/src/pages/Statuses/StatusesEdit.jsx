
import { useState } from "react";
import { useNavigate } from "react-router";
import { createStatuses } from "../../components/apiClient";

function StatusesEdit({status}){
    const navigate = useNavigate();
    const [statusID, setStatusID] = useState(status.statusID);
    const [statusName, setStatusName] = useState(status.statusName);
    const onSubmit = (e) => {
        e.preventDefault();
        const ID = -1;
        const status = {ID, statusName};
        createStatuses(status);
        navigate("/statuses")
    }
    return(
        <><h1>Add Statuses</h1>
            <form>
                {/* <label htmlFor="statusID">statusID</label>
                <input name = "statusID" type="text" value={statusID} onChange={setStatusID}/> */}

                <label htmlFor="statusName">status</label>
                <input name = "statusName "type="text" value={statusName} onChange={setStatusName} />

                <button>Save</button>
            </form>
        </>
    )
};

export default StatusesEdit;