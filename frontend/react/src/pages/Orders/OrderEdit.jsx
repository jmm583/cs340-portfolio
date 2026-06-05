import { useState, useEffect } from "react";
import OrderProducts from "./OrderProducts";
import { useNavigate } from "react-router";
import { getCustomers, updateOrder } from "../../components/apiClient";
function OrderEdit({order, setItemToEdit}){
    const parseDateFromDateTime= (datetime) => {
        if (datetime) {
            const parts = datetime.split("T");
            return parts[0];
        }

    };
    const parseTimeFromDateTime= (datetime) => {
        if (datetime) {
            const parts = datetime.split("T");
            return parts[1].slice(0,5);
        }
    };
    const [orderID, setOrderID] = useState(order.orderID);
    const [customerID, setCustomerID] = useState(order.customerID);
    const [customerEmail, setCustomerEmail] = useState(order.customerEmail);
    const [complete, setComplete] = useState(order.complete);
    const [statusName, setStatusName] = useState(order.statusName);
    const [statusDate, setStatusDate] = useState();
    const [totalCost, setTotalCost] = useState(order.totalCost);
    const [customers, setCustomers] = useState([]);

    const [tempDate, setTempDate] = useState(parseDateFromDateTime(order.statusDate));
    const [tempTime, setTempTime]= useState(parseTimeFromDateTime(order.statusDate));

    const navigate = useNavigate();
    const loadCustomers = async () =>{
        const rows = await getCustomers();
        setCustomers(rows);

    };
    const formatDatetime = () => {

    return `${tempDate} ${tempTime}`;
    };
    const onSubmit = async (e) => {
        e.preventDefault();

        const order = {orderID, customerID, complete, totalCost, statusDate: formatDatetime(), statusName};
        await updateOrder(order);
        navigate("/orders");

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
                    <select required onChange={e => setCustomerID(e.target.value)} value={customerID}>
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
                    <input name="statusDatedt" type="date" value={tempDate} onChange={ e => setTempDate(e.target.value)} />
                    <input name="statusDatedt" type="time" value={tempTime} onChange={ e => setTempTime(e.target.value)} />
                    
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button> 
                </div>
            </form>
            <OrderProducts itemToEdit={order} setItemToEdit={setItemToEdit}/>
        </div>
    )
}

export default OrderEdit;