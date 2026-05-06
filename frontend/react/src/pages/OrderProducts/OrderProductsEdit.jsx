


import { useState } from "react";

function OrderProductsEdit({itemToEdit}) {
    const [orderProductsID, setOrderProductsID] = useState(itemToEdit.orderProductsID);
    const [orderID, setOrderID] = useState(itemToEdit.orderID);
    const [productID, setProductID] = useState(itemToEdit.productID);
    const [quantity, setQuantity] = useState(itemToEdit.quantity);

    return (
    <> <h1>Edit OrderProducts</h1>
        <form>
            <label htmlFor="orderProductsID">orderProductsID</label>
            <input name="orderProductsID" type="number" value={orderProductsID} onChange={setOrderProductsID} />

            <label htmlFor="orderID">orderID</label>
            <input name="orderID" type="number" value={orderID} onChange={setOrderID} />

            <label htmlFor="productID">productID</label>
            <input name="productID" type="text" value={productID} onChange={setProductID} />

            <label htmlFor="quantity">quantity</label>
            <input name="quantity" type="text" value={quantity} onChange={setQuantity} />
            <button>Save</button>
        </form>
    </>
)};


export default OrderProductsEdit;