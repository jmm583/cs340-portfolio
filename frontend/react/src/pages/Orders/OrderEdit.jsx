import { useState } from "react";
import OrderProducts from "./OrderProducts";

function OrderEdit({order}){
    const [orderID, setOrderID] = useState(order.orderID);
    const [customerID, setCustomerID] = useState(order.customerID);
    const [customerEmail, setCustomerEmail] = useState(order.customerEmail);
    const [complete, setComplete] = useState(order.complete);
    const [statusName, setStatusName] = useState(order.statusName);
    const [statusDate, setStatusDate] = useState(order.statusDate);
    const [totalCost, setTotalCost] = useState(order.totalCost);

    const onSubmit = (e) => {
        e.preventDefault();
    }
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
                    <div>{customerEmail}</div>
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