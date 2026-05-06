
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { getCustomers, deleteCustomer } from "../../components/apiClient";
import TableRow from '../../components/TableRow';

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
    
    useEffect(() => {
        loadCustomers();
        
    }, []);
    return (
        <>

            <h1>Customers</h1>
            <p><a href="/customers/create">Add Customer</a></p>
            <table>
                <thead>
                    <tr>
                        {customers.length > 0 && Object.keys(customers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer, index) => (
                        <TableRow key={index} rowObject={customer} refreshObjects={loadCustomers} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>
            
               
       
        </>
    )
};
export default Customers;

