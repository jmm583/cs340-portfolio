
import { useState } from "react";
import { getStatuses, createOrderStatuses } from "../../components/apiClient";
import { useNavigate } from "react-router";

function OrderStatusCreate() {
    const [orderStatusID, setOrderStatusID] = useState();
    const [orderID, setOrderID] = useState();
    const [statusID, setStatusID] = useState();
    const [statusDate, setStatusDate] = useState();
    const statuses = getStatuses();
    const setStatus = (e) => {
        console.log(e.target.value);
        setStatusID(e.target.value);

    };
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        const ID = -1;
        const orderstatus = (ID, statusID, statusDate);
        createOrderStatuses(orderstatus);
        navigate("orderstatuses");
        
    }

    return (
        <div className='main'>
            <h1>Add OrderStatus</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="orderStatusID">orderStatusID</label>
                <input name="orderStatusID" type="text" value={orderStatusID} onChange={setOrderStatusID} ></input> */}

                <label htmlFor="orderID">orderID</label>
                <input name="orderID" type="text" value={orderID} onChange={e => setOrderID(e.target.value)}></input>

                <label htmlFor="statusID">statusID</label>
                {/* <input name="statusID" type="text" value={statusID} ></input> */}
                <select onChange={setStatus}>
                    {statuses.map((status) => (
                        <option key={status.statusID} value={status.statusID}>
                        {status.statusName}
                        </option>
                    ))}
                </select>

                <label htmlFor="statusDate">statusDate</label>
                <input name="statusDate" type="date" value={statusDate} onChange={e => setStatusDate(e.target.value)}></input>
                <button type="submit">Save</button>
            </form>
        </div>
    )
};


export default OrderStatusCreate;