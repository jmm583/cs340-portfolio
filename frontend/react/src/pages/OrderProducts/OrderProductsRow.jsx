

function OrderProductRow({item}) {

    return (
        <>
        <tr>
            <td>{item.orderProductsID}</td>
            <td>{item.orderID}</td>
            <td>{item.productID}</td> 
            <td>{item.quantity}</td>

        </tr>
        </>

                
    )
};
export default OrderProductRow;