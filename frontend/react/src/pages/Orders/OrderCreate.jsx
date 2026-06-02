import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createOrder, getCustomers } from "../../components/apiClient";

function OrderCreate(){
    const [orderID, setOrderID] = useState();
    const [customerID, setCustomerID] = useState();
    const [complete, setComplete] = useState("false");
    const [totalCost, setTotalCost] = useState();
    const [statusName, setStatusName] = useState();
    const [statusDate, setStatusDate] = useState();
    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();


    const loadCustomers = async () =>{
        const rows = await getCustomers();
        setCustomers(rows);

    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let intComplete = 0;
        if (complete) {
            intComplete = 1;
        }
        
        const order = {"customerID":customerID, "complete":intComplete, "totalCost":totalCost, "statusDate":statusDate, "statusName":statusName};
        
        await createOrder(order);
        navigate("/orders");
        
    }

    useEffect(() => {
        loadCustomers();
        
    }, []);
    return (
        <div className='main'>
            <h1>Add Order</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="orderID">orderID</label>
                <input name="orderID" type="number" value={orderID}  onChange={setOrderID}/> */}
                
                <div className="form-group">
                    <label htmlFor="customerID">Customer</label>
                    <select required onChange={e => setCustomerID(e.target.value)}>
                        <option value="" hidden>
                            -- Please choose a Customer --
                        </option>
                        {customers.map((customer) => (
                            <option key={customer.customerID} value={customer.customerID}>
                            {customer.email}
                            </option>
                        ))}
                    </select>
                    {/* <input name="customerID" type="number" value={customerID} onChange={e => setCustomerID(e.target.value)} /> */}
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
        </div>
    )
}

export default OrderCreate;