
import { useState } from "react";


function OrderStatusEdit({orderstatus}) {
    const [orderStatusID, setOrderStatusID] = useState(orderstatus.orderStatusID);
    const [orderID, setOrderID] = useState(orderstatus.orderID);
    const [statusID, setStatusID] = useState(orderstatus.statusID);
    const [statusDate, setStatusDate] = useState(orderstatus.statusDate);

    return (
        <>
            <form>
                <label htmlFor="orderStatusID">orderStatusID</label>
                <input name="orderStatusID" type="text" value={orderStatusID} onChange={setStatusID} ></input>

                <label htmlFor="orderID">orderID</label>
                <input name="orderID" type="text" value={orderID} onChange={setOrderID}></input>

                <label htmlFor="statusID">statusID</label>
                <input name="statusID" type="text" value={statusID} onChange={setStatusID} ></input>

                <label htmlFor="statusDate">statusDate</label>
                <input name="statusDate" type="date" value={statusDate} onChange={setStatusDate}></input>
                <button>Save</button>
            </form>
        </>
    )
};


export default OrderStatusEdit;