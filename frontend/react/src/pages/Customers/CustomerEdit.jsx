
import { useState } from "react";

function CustomerEdit({customer}) {
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
                <label htmlFor="firstName">firstName</label>
                <input name="firstName" type="text" value={firstName} onChange={setfirstName}/>

                <label htmlFor="lastName">lastName</label>
                <input name="lastName" type="text" value={lastName} onChange={setlastName}/>

                <label htmlFor="email">email</label>
                <input name="email" type="text" value={email} onChange={setemail}/>

                <label htmlFor="phone">phone</label>
                <input name="phone" type="number" value={phone} onChange={setPhone}/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
};
export default CustomerEdit;

