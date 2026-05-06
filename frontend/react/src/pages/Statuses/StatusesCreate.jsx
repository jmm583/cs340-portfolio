
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
        <><h1>Add Statuses</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="statusID">statusID</label>
                <input name = "statusID" type="text" value={statusID} onChange={e => setDescription(e.target.value)}/> */}
                <label htmlFor="statusName">status</label>
                <input name = "statusName "type="text" value={statusName} onChange={e => setStatusName(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        </>
    )
};

export default StatusesCreate;