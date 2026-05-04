

import { useState, useEffect } from "react";
import {getOrders} from "../../components/apiClient";
import OrdersRow from "./OrdersRow";

function Orders(){
    const [orders, setOrders] = useState([]);

    const loadOrders = () => {
        const data = getOrders();
        setOrders(data);
    }
    useEffect(() => {
        loadOrders();
        
    }, []);


    return (
      
        <>
            <table>
                <thead>
                    <tr>
                        <th>orderID</th>
                        <th>customerID</th>
                        <th>complete</th>
                        <th>totalCost</th>
                        
                    </tr>
                </thead>
                <tbody>

                    {orders.map((order) => (<OrdersRow key={order.orderID} order={order} />))}


                </tbody>
            </table>

        </>

       
    )
}

export default Orders;