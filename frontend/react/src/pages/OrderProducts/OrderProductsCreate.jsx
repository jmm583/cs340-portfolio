


import { useState } from "react";
import { useNavigate } from "react-router";
import { createOrderProduct } from "../../components/apiClient";

function OrderProductsCreate() {
    const [orderProductsID, setOrderProductsID] = useState();
    const [orderID, setOrderID] = useState();
    const [productID, setProductID] = useState();
    const [quantity, setQuantity] = useState();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const ID = -1;
        const orderproduct = {ID, orderID, productID, quantity};
        createOrderProduct(orderproduct);
        navigate("/orderproducts");

    }

    return (
        <div className='main'>
            <h1>Add OrderProducts</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="orderProductsID">orderProductsID</label>
                <input name="orderProductsID" type="number" value={orderProductsID} onChange={setOrderProductsID} /> */}

                <label htmlFor="orderID">orderID</label>
                <input name="orderID" type="number" value={orderID} onChange={e => setOrderID(e.target.value)} />

                <label htmlFor="productID">productID</label>
                <input name="productID" type="text" value={productID} onChange={e => setProductID(e.target.value)} />

                <label htmlFor="quantity">quantity</label>
                <input name="quantity" type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        </div>
)};


export default OrderProductsCreate;