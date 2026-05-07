
import { useState, useEffect } from "react";
import {getStatuses, deleteStatuses} from "../../components/apiClient";

import { useNavigate } from 'react-router';
import TableRow from '../../components/TableRow';

function Statuses({setItemToEdit}){
    const [statusList, setStatusList] = useState([]);
    const navigate = useNavigate();
    const loadStatuses = () => {
        const data = getStatuses();
        setStatusList(data);
    }
    const onEdit = (item) =>{
 
        setItemToEdit(item);
        console.log("statusesEdit ");
        navigate('/statuses/edit');
    };
    const onDelete = (item) => {

        deleteStatuses(item);
        loadStatuses();
    };
    useEffect(() => {
        loadStatuses();
        
    }, []);
    return(
        <>
            <h1>Statuses</h1>
            <p><a href="/statuses/create"> Add Status</a></p>

            <table>
                <thead>
                    <tr>
                        {statusList.length > 0 && Object.keys(statusList[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {statusList.map((status, index) => (
                        <TableRow key={index} rowObject={status} refreshObjects={loadStatuses} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>

        </>
    )
};

export default Statuses;
