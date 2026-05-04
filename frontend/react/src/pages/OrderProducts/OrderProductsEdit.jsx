


import { useState } from "react";

function OrderProductsEdit() {
    const [orderProductsID, setOrderProductsID] = useState("");
    const [orderID, setOrderID] = useState("");
    const [productID, setProductID] = useState("");
    const [quantity, setQuantity] = useState("");

    return (
    <>  
        <form>
            <label htmlFor="orderProductsID">orderProductsID</label>
            <input name="orderProductsID" type="number" value={orderProductsID} onchange={setOrderProductsID} />
            <label htmlFor="orderID">orderID</label>
            <input name="orderID" type="checkbox" value={orderID} onchange={setOrderID} />
            <label htmlFor="productID">productID</label>
            <input name="productID" type="text" value={productID} onchange={setProductID} />
            <label htmlFor="quantity">quantity</label>
            <input name="quantity" type="text" value={quantity} onChange={setQuantity} />
        </form>
    </>
)};


export default OrderProductsEdit;