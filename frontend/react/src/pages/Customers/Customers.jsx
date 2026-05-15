
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { getCustomers, deleteCustomer } from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

function Customers({setItemToEdit}) {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const loadCustomers = () => {
        const data = getCustomers();
        setCustomers(data);
    };
    const onEdit = (item) =>{
 
        setItemToEdit(item);
        navigate('/customers/edit');
    };
    const onDelete = (item) => {

        deleteCustomer(item);
        loadCustomers();
    };
    const tableHeaders = {
        customerID: "Customer ID",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone"
    };
    useEffect(() => {
        loadCustomers();
        
    }, []);
    return (
        <div className='main'>

            <h1>Customers</h1>
            <h2><Link to="/customers/create">Add Customer</Link></h2>
            <table>
                <thead>
                    <tr>
                        {customers.length > 0 && Object.keys(customers[0]).map((header, index) => (
                            <th key={index}>{tableHeaders[header]}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer, index) => (
                        <TableRow key={index} rowObject={customer} refreshObjects={loadCustomers} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>
            
               
       
        </div>
    )
};
export default Customers;

