
import { useState } from "react";


function OrderStatusEdit() {
    const [orderStatusID, setOrderStatusID] = useState();
    const [orderID, setOrderID] = useState();
    const [statusID, setStatusID] = useState();
    const [statusDate, setStatusDate] = useState();

    return (
        <>
            <label htmlFor="orderStatusID">orderStatusID</label>
            <input name="orderStatusID" type="text" ></input>

            <label htmlFor="orderID">orderID</label>
            <input name="orderID" type="text" ></input>

            <label htmlFor="statusID">statusID</label>
            <input name="statusID" type="text" ></input>

            <label htmlFor="statusDate">statusDate</label>
            <input name="statusDate" type="date" ></input>
        </>
    )
};


export default OrderStatusEdit;