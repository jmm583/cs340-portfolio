import { useState } from "react";

function OrderEdit({order}){
    const [orderID, setorderID] = useState(order.orderID);
    const [customerID, setcustomerID] = useState(order.customerID);
    const [complete, setcomplete] = useState(order.complete);
    const [totalCost, settotalCost] = useState(order.totalCost);

    return (
        <>
            <form>
                <label htmlFor="orderID">orderID</label>
                <input name="orderID" type="number" value={orderID}  onChange={setorderID}/>

                <label htmlFor="customerID">customerID</label>
                <input name="customerID" type="number" value={customerID} onChange={setcustomerID} />

                <label htmlFor="complete">complete</label>
                <input name="complete" type="checkbox" value={complete} onChange={setcomplete} />

                <label htmlFor="totalCost">totalCost</label>
                <input name="totalCost" type="text" value={totalCost} onChange={settotalCost} />
                <button>Save</button>
            </form>
        </>
    )
}

export default OrderEdit;