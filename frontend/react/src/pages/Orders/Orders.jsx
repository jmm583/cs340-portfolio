
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getOrders, deleteOrder} from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

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

        deleteOrder(item);
        loadOrders();
    };
    const tableHeaders = {
        orderID: "Order ID",
        customerID: "Customer ID",
        fullName: "Customer",
        customerEmail: "Customer Email",
        complete: "Complete",
        totalCost: "Total Cost",
        statusName: "Status Name",
        statusDate: "Status Date"
    };
    							

    useEffect(() => {
        loadOrders();
        
    }, []);


    return (
      
        <div className='main'>
            <h1>Orders</h1>
            <h2><Link to='/orders/create'>Add Order</Link></h2>

            <table>
                <thead>
                    <tr>
                        {orders.length > 0 && Object.keys(orders[0]).map((header, index) => (
                            <th key={index}>{tableHeaders[header]}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <TableRow key={index} rowObject={order} refreshObjects={loadOrders} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>

        </div>

       
    )
}

export default Orders;