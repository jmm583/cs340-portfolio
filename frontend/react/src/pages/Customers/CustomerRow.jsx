

function CustomerRow({customer}) {

    return (
        <>
        <tr>
            <td>{customer.customerID}</td>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td> 
            <td>{customer.email}</td>
            <td>{customer.phone}</td> 
        </tr>
        </>

                
    )
};
export default CustomerRow;