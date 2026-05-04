
import { useState, useEffect } from "react";
import {getOrderStatuses} from "../../components/apiClient";
import OrderStatusRow from "./OrderStatusRow";


function OrderStatuses() {
    const [orderStatuses, setOrderStatuses] = useState([]);

    const loadOrderStatuses = () => {
        const data = getOrderStatuses();
        setOrderStatuses(data);
    }
    useEffect(() => {
        loadOrderStatuses();
        
    }, []);
    return (
      
        <>
            <table>
                <thead>
                    <tr>
                        <th>orderStatusID</th>
                        <th>orderID</th>
                        <th>statusName</th>
                        <th>statusDate</th>

                        
                    </tr>
                </thead>
                <tbody>

                    {orderStatuses.map((orderstatus) => (<OrderStatusRow key={orderstatus.orderStatusID} item={orderstatus} />))}


                </tbody>
            </table>

        </>

       
    )
    
};


export default OrderStatuses;

