


import { useState } from "react";

function OrderProductsEdit({itemToEdit}) {
    const [orderProductsID, setOrderProductsID] = useState(itemToEdit.orderProductsID);
    const [orderID, setOrderID] = useState(itemToEdit.orderID);
    const [productID, setProductID] = useState(itemToEdit.productID);
    const [quantity, setQuantity] = useState(itemToEdit.quantity);
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='main'>
            <h1>Edit OrderProducts</h1>
            <form onSubmit={onSubmit}>
                                
                <div className="form-group">
                    <label htmlFor="orderProductsID">orderProductsID</label>
                    {orderProductsID}
                    {/* <input name="orderProductsID" type="number" value={orderProductsID} onChange={setOrderProductsID} /> */}
                </div>
                <div className="form-group">
                    <label htmlFor="orderID">OrderID</label>
                    <input name="orderID" type="number" required value={orderID} onChange={e => setOrderID(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="productID">ProductID</label>
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


export default OrderProductsEdit;