


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
                <div className="form-group">
                    <label htmlFor="orderID">Order ID</label>
                    <input name="orderID" type="number" required value={orderID} onChange={e => setOrderID(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="productID">Product ID</label>
                    <input name="productID" type="number" required value={productID} onChange={e => setProductID(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input name="quantity" type="number" required value={quantity} onChange={e => setQuantity(e.target.value)} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
)};


export default OrderProductsCreate;