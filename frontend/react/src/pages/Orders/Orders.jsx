
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getOrders, deleteOrders} from "../../components/apiClient";
import TableRow from '../../components/TableRow';

function Orders({setItemToEdit}){
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const loadOrders = () => {
        const data = getOrders();
        setOrders(data);
    }
    const onEdit = (item) =>{
 
        setItemToEdit(item);
        console.log("orderEdit ");
        navigate('/orders/edit');
    };
    const onDelete = (item) => {

        deleteOrders(item);
        loadOrders();
    };
    useEffect(() => {
        loadOrders();
        
    }, []);


    return (
      
        <>
            <h1>Orders</h1>

            <table>
                <thead>
                    <tr>
                        {orders.length > 0 && Object.keys(orders[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <TableRow key={index} rowObject={order} refreshObjects={loadOrders} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>

        </>

       
    )
}

export default Orders;