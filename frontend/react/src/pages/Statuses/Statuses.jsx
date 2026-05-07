
import { useState, useEffect } from "react";
import {getStatuses, deleteStatuses} from "../../components/apiClient";

import { useNavigate } from 'react-router';
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

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
        <div className='main'>
            <h1>Statuses</h1>
            <p><Link to="/statuses/create"> Add Status</Link></p>

            <table>
                <thead>
                    <tr>
                        {statusList.length > 0 && Object.keys(statusList[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {statusList.map((status, index) => (
                        <TableRow key={index} rowObject={status} refreshObjects={loadStatuses} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>

        </div>
    )
};

export default Statuses;
