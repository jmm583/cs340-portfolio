

function OrderStatusRow({item}) {

    return (
        <>
        <tr>
            <td>{item.orderStatusID}</td>
            <td>{item.orderID}</td>
            <td>{item.statusID}</td>
            <td>{item.statusDate}</td> 

        </tr>
        </>     
    )
};
export default OrderStatusRow;