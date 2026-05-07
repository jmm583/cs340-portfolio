import { useState } from "react";

function OrderEdit({order}){
    const [orderID, setOrderID] = useState(order.orderID);
    const [customerID, setCustomerID] = useState(order.customerID);
    const [complete, setComplete] = useState(order.complete);
    const [totalCost, setTotalCost] = useState(order.totalCost);

    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='main'>
            <h1>Edit Order</h1>
            <form onSubmit={onSubmit}>
                              
                <div className="form-group">
                    <label htmlFor="orderID">orderID</label>
                    <input name="orderID" type="number" value={orderID}  onChange={setOrderID}/>
                </div>
                <div className="form-group">
                    <label htmlFor="customerID">customerID</label>
                    <input name="customerID" type="number" value={customerID} onChange={setCustomerID} />
                </div>
                <div className="form-group">
                    <label htmlFor="complete">complete</label>
                    <input name="complete" type="checkbox" value={complete} onChange={setComplete} />
                </div>
                <div className="form-group">
                    <label htmlFor="totalCost">totalCost</label>
                    <input name="totalCost" type="text" value={totalCost} onChange={setTotalCost} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button> 
                </div>
            </form>
        </div>
    )
}

export default OrderEdit;