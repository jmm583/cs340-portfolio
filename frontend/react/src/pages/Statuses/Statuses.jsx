
import { useState, useEffect } from "react";
import {getStatuses} from "../../components/apiClient";
import StatusRow from "./StatusRow";

function Statuses(){
    const [statusList, setStatusList] = useState([]);

    const loadStatuses = () => {
        const data = getStatuses();
        setStatusList(data);
    }
    useEffect(() => {
        loadStatuses();
        
    }, []);
    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>statusID</th>
                        <th>statusName</th>

                        
                    </tr>
                </thead>
                <tbody>

                    {statusList.map((status) => (<StatusRow key={status.statusID} status={status} />))}


                </tbody>
            </table>

        </>
    )
};

export default Statuses;
