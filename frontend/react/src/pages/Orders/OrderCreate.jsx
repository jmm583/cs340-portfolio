import { useState } from "react";
import { useNavigate } from "react-router";
import { createOrder } from "../../components/apiClient";

function OrderCreate(){
    const [orderID, setOrderID] = useState();
    const [customerID, setCustomerID] = useState();
    const [complete, setComplete] = useState();
    const [totalCost, setTotalCost] = useState();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const ID = -1;
        const order = {ID, customerID, complete, totalCost}
        createOrder(order);
        navigate("/orders")

    }

    return (
        <><h1>Add Order</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="orderID">orderID</label>
                <input name="orderID" type="number" value={orderID}  onChange={setOrderID}/> */}

                <label htmlFor="customerID">customerID</label>
                <input name="customerID" type="number" value={customerID} onChange={e => setCustomerID(e.target.value)} />

                <label htmlFor="complete">complete</label>
                <input name="complete" type="checkbox" value={complete} onChange={e => setComplete(e.target.value)} />

                <label htmlFor="totalCost">totalCost</label>
                <input name="totalCost" type="text" value={totalCost} onChange={e => setTotalCost(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        </>
    )
}

export default OrderCreate;