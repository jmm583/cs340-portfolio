
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getOrderStatuses, deleteOrderStatuses} from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

function OrderStatuses({setItemToEdit}) {
    const [orderStatuses, setOrderStatuses] = useState([]);
    const navigate = useNavigate();
    const loadOrderStatuses = () => {
        const data = getOrderStatuses();
        setOrderStatuses(data);
    }
    const onEdit = (item) =>{
 
        setItemToEdit(item);
        console.log("orderStatusesEdit ");
        navigate('/ordersstatuses/edit');
    };
    const onDelete = (item) => {

        deleteOrderStatuses(item);
        loadOrderStatuses();
    };
    useEffect(() => {
        loadOrderStatuses();
        
    }, []);
    return (
      
        <div className='main'>
            <h1>OrderStatuses</h1>
            <h2><Link to='/ordersstatuses/create'>Add OrderStatus</Link></h2>

            <table>
                <thead>
                    <tr>
                        {orderStatuses.length > 0 && Object.keys(orderStatuses[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orderStatuses.map((orderstatus, index) => (
                        <TableRow key={index} rowObject={orderstatus} refreshObjects={loadOrderStatuses} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>

        </div>

       
    )
    
};


export default OrderStatuses;

