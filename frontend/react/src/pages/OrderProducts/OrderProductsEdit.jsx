


import { useState, useEffect } from "react";
import { getProducts, getOrders, updateOrderProduct } from "../../components/apiClient";
import { useNavigate } from "react-router";

function OrderProductsEdit({itemToEdit}) {
    const [orderProductsID, setOrderProductsID] = useState(itemToEdit.orderProductsID);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [orderID, setOrderID] = useState(itemToEdit.orderID);
    const [productID, setProductID] = useState(itemToEdit.productID);
    const [quantity, setQuantity] = useState(itemToEdit.quantity);
    const navigate = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        const orderProduct = {orderProductsID, orderID, productID, quantity};
        await updateOrderProduct(orderProduct);
        navigate("/orderproducts");
    };

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);

    };
    const loadOrders = async () => {
        const data = await getOrders();
        setOrders(data);
    };
    useEffect(() => {
        loadProducts();
        loadOrders();
    }, []);
    return (
        <div className='main'>
            <h1>Edit OrderProducts</h1>
            <form onSubmit={onSubmit}>
                                
                <div className="form-group">
                    <label htmlFor="orderProductsID">orderProductsID</label>
                    {orderProductsID}
                    {/* <input name="orderProductsID" type="number" value={orderProductsID} onChange={setOrderProductsID} /> */}
                </div>
                {/* <div className="form-group">
                    <label htmlFor="orderID">OrderID</label>
                    <input name="orderID" type="number" required value={orderID} onChange={e => setOrderID(e.target.value)} />
                </div> */}
                <div className="form-group">
                    <label htmlFor="orderID">Order</label>
                    <select name="orderID" required onChange={e => setOrderID(e.target.value)} value={orderID}>
                        <option value="" hidden>
                            -- Please choose an order --
                        </option>
                        {/* <option value="-1" key="-1">Select a Product</option> */}
                        {orders.map((order) => (
                            <option key={order.orderID} value={order.orderID}>
                            {order.orderID}: {order.email}, {order.firstName}, {order.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="productID">ProductID</label>
                    <input name="productID" type="number" required value={productID} onChange={e => setProductID(e.target.value)} />
                </div> */}
                <div className="form-group">
                    <label htmlFor="productID">Product</label>
                    <select name="productID" required onChange={e => setProductID(e.target.value)} value={productID}>
                        <option value="" hidden>
                            -- Please choose an Product --
                        </option>
                        {products.map((product) => (
                            <option key={product.productID} value={product.productID}>
                            {product.SKU}: {product.name}
                            </option>
                        ))}
                    </select>
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