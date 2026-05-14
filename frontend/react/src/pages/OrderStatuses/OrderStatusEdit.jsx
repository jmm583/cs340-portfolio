
import { useState } from "react";
import { getStatuses } from "../../components/apiClient";

function OrderStatusEdit({orderstatus}) {
    const [orderStatusID, setOrderStatusID] = useState(orderstatus.orderStatusID);
    const [orderID, setOrderID] = useState(orderstatus.orderID);
    const [statusID, setStatusID] = useState(orderstatus.statusID);
    const [statusDate, setStatusDate] = useState(orderstatus.statusDate);
    const statuses = getStatuses();
    const setStatus = (e) => {
        console.log(e.target.value);
        setStatusID(e.target.value);

    };
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='main'>
            <h1>Edit OrderStatus</h1>
            <form onSubmit={onSubmit}>
             
                <div className="form-group">
                    <label htmlFor="orderStatusID">orderStatusID</label>
                    <input name="orderStatusID" type="text" value={orderStatusID} onChange={setOrderStatusID} ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="orderID">orderID</label>
                    <input name="orderID" type="text" value={orderID} onChange={setOrderID}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="statusID">statusID</label>
                    {/* <input name="statusID" type="text" value={statusID} ></input> */}
                    <select onChange={setStatus}>
                        {statuses.map((status) => (
                            <option key={status.statusID} value={status.statusID}>
                            {status.statusName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="statusDate">statusDate</label>
                    <input name="statusDate" type="date" value={statusDate} onChange={setStatusDate}></input>
                </div>
                <div className="form-group actions">
                    <button type='submit' >Save</button>
                </div>
            </form>
        </div>
    )
};


export default OrderStatusEdit;