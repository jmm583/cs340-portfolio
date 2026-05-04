



function OrdersRow({order}) {

    return (
        <>
        <tr>
            <td>{order.orderID}</td>
            <td>{order.customerID}</td>
            <td>{order.complete}</td> 
            <td>{order.totalCost}</td>
        </tr>
        </>

                
    )
};
export default OrdersRow;