
import { useState } from "react";
import { updateCustomer } from "../../components/apiClient";
import { useNavigate } from "react-router";

function CustomerEdit({customer}) {
    const [customerID, setCustomerID] = useState([customer.customerID]);
    const [firstName, setfirstName] = useState([customer.firstName]);
    const [lastName, setlastName] = useState([customer.lastName]);
    const [email, setEmail] = useState([customer.email]);
    const [phone, setPhone] = useState([customer.phone]);
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const customer = {customerID, firstName, lastName, email, phone};
        await updateCustomer(customer);
        navigate("/customers");

    }
    return (
        <div className='main'>
            <h1>Edit Customer</h1>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input name="firstName" type="text" required value={firstName} onChange={e => setfirstName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input name="lastName" type="text" required  value={lastName} onChange={e => setlastName(e.target.value)}/>
                
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="text" required value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input name="phone" type="text" value={phone} onChange={e => setPhone(e.target.value)}/>
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
};
export default CustomerEdit;

