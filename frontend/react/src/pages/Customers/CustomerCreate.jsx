
import { useState } from "react";
import { createCustomer } from "../../components/apiClient";
import { useNavigate } from "react-router";

function CustomerCreate() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const ID = -1;
        const customer = {ID, firstName, lastName, email, phone}
        createCustomer(customer);
        navigate("/customers");

    }
    return (
        <div className='main'>
            <h1>Create Customer</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="firstName">firstName</label>
                <input name="firstName" type="text" value={firstName} onChange={ e => setFirstName(e.target.value)}/>

                <label htmlFor="lastName">lastName</label>
                <input name="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>

                <label htmlFor="email">email</label>
                <input name="email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                <label htmlFor="phone">phone</label>
                <input name="phone" type="number" value={phone} onChange={e => setPhone(e.target.value)}/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
};
export default CustomerCreate;

