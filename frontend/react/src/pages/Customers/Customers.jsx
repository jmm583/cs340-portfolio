
import { useState, useEffect } from "react";
import {getCustomers} from "../../components/apiClient";
import CustomerRow from "./CustomerRow";
function Customers() {
    const [customers, setCustomers] = useState([]);

    const loadCustomers = () => {
        const data = getCustomers();
        setCustomers(data);
    }
    useEffect(() => {
        loadCustomers();
        
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>customerID</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>email</th>
                        <th>phone</th>
                    </tr>
                </thead>
                <tbody>

                    {customers.map((customer) => (<CustomerRow key={customer.customerID} customer={customer} />))}


                </tbody>
            </table>

        </>
    )
};
export default Customers;

