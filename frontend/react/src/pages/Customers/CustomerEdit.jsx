
import { useState } from "react";

function CustomerEdit({customer}) {
    const [customerID, setCustomerID] = useState([customer.customerID]);
    const [firstName, setfirstName] = useState([customer.firstName]);
    const [lastName, setlastName] = useState([customer.lastName]);
    const [email, setemail] = useState([customer.email]);
    const [phone, setPhone] = useState([customer.phone]);
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='main'>
            <h1>Edit Customer</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="customerID">customerID</label>
                    <input name="customerID" type="text" value={customerID} onChange={setCustomerID}/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">firstName</label>
                    <input name="firstName" type="text" value={firstName} onChange={setfirstName}/>
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">lastName</label>
                    <input name="lastName" type="text" value={lastName} onChange={setlastName}/>
                
                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input name="email" type="text" value={email} onChange={setemail}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">phone</label>
                    <input name="phone" type="text" value={phone} onChange={setPhone}/>
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
};
export default CustomerEdit;

