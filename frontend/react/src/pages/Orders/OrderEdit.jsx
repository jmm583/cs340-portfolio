import { useState, useEffect } from "react";
import OrderProducts from "./OrderProducts";
import { getCustomers, updateOrder } from "../../components/apiClient";
function OrderEdit({order}){
    const formatLocalDateTime = (date) => {
        const year = date.getFullYear();
        // Months are zero-indexed, pad with leading zero
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const [orderID, setOrderID] = useState(order.orderID);
    const [customerID, setCustomerID] = useState(order.customerID);
    const [customerEmail, setCustomerEmail] = useState(order.customerEmail);
    const [complete, setComplete] = useState(order.complete);
    const [statusName, setStatusName] = useState(order.statusName);
    const [statusDate, setStatusDate] = useState(formatLocalDateTime(new Date(order.statusDate)));
    const [totalCost, setTotalCost] = useState(order.totalCost);
    const [customers, setCustomers] = useState([]);


    const loadCustomers = async () =>{
        const rows = await getCustomers();
        setCustomers(rows);

    };
 
    const onSubmit = async (e) => {
        e.preventDefault();
        const order = {orderID, customerID, complete, totalCost, statusDate, statusName};
        await updateOrder(order);

    };
    useEffect(() => {
        loadCustomers();
        
    }, []);
    return (
        <div className='main'>
            <h1>Edit Order</h1>
            <form onSubmit={onSubmit}>
                              
                <div className="form-group">
                    <label htmlFor="orderID">Order ID</label>
                    <div>{orderID}</div>
                    {/* <input name="orderID" type="number" value={orderID}  onChange={setOrderID}/> */}
                </div>
                <div className="form-group">
                    <label htmlFor="customerID">Customer Email</label>
                    <select onChange={e => setCustomerID(e.target.value)} value={customerID}>
                        {customers.map((customer) => (
                            <option key={customer.customerID} value={customer.customerID}>
                            {customer.email}
                            </option>
                        ))}
                    </select>
                    {/*<input name="customerEmail" type="text" value={customerEmail} onChange={setCustomerEmail} /> */}
                </div>

                <div className="form-group">
                    <label htmlFor="totalCost">Total Cost</label>
                    <input name="totalCost" type="number" value={totalCost} onChange={e => setTotalCost(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="complete">Complete</label>
                    <input name="complete" type="checkbox" value={complete} onChange={e => setComplete(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="statusName">Status</label>
                    <input name="statusName" type="text" value={statusName} onChange={e => setStatusName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="statusDate">Status Date</label>
                    <input name="statusDate" type="datetime-local" value={statusDate} onChange={e => setStatusDate(e.target.value)} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button> 
                </div>
            </form>
            <OrderProducts itemToEdit={order}/>
        </div>
    )
}

export default OrderEdit;