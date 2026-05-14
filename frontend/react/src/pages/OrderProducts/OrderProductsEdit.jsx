


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
                    <input name="orderProductsID" type="number" value={orderProductsID} onChange={setOrderProductsID} />
                </div>
                <div className="form-group">
                    <label htmlFor="orderID">OrderID</label>
                    <input name="orderID" type="number" value={orderID} onChange={setOrderID} />
                </div>
                <div className="form-group">
                    <label htmlFor="productID">ProductID</label>
                    <input name="productID" type="text" value={productID} onChange={setProductID} />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input name="quantity" type="text" value={quantity} onChange={setQuantity} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
)};


export default OrderProductsEdit;