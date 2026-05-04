
import { useState } from "react";

function CustomerEdit() {
    const [firstName, setfirstName] = useState([]);
    const [lastName, setlastName] = useState([]);
    const [email, setemail] = useState([]);
    const [phone, setPhone] = useState([]);

    return (
        <>
            <form>
                <label htmlFor="firstName">firstName</label>
                <input name="firstName" type="text" value={firstName} onChange={setfirstName}/>

                <label htmlFor="lastName">lastName</label>
                <input name="lastName" type="text" value={lastName} onChange={setlastName}/>

                <label htmlFor="email">email</label>
                <input name="email" type="text" value={email} onChange={setemail}/>

                <label htmlFor="phone">phone</label>
                <input name="phone" type="number" value={phone} onChange={setPhone}/>
            </form>
        </>
    )
};
export default CustomerEdit;

