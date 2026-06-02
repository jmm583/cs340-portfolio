


import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createOrderProduct, getProducts, getOrders } from "../../components/apiClient";

function OrderProductsCreate() {
    const [orderProductsID, setOrderProductsID] = useState();
    const [orderID, setOrderID] = useState();
    const [orders, setOrders] = useState([]);
    const [productID, setProductID] = useState();
    const [quantity, setQuantity] = useState();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        const orderproduct = {orderID, productID, quantity};
      
        await createOrderProduct(orderproduct);
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
            <h1>Add OrderProducts</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="orderProductsID">orderProductsID</label>
                <input name="orderProductsID" type="number" value={orderProductsID} onChange={setOrderProductsID} /> */}
                {/* <div className="form-group">
                    <label htmlFor="orderID">Order ID</label>
                    <input name="orderID" type="number" required value={orderID} onChange={e => setOrderID(e.target.value)} />
                </div> */}
                <div className="form-group">
                    <label htmlFor="orderID">Order</label>
                    <select name="orderID" required onChange={e => setOrderID(e.target.value)}>
                        <option value="" hidden>
                            -- Please choose an option --
                        </option>
                        {orders.map((order) => (
                            <option key={order.orderID} value={order.orderID}>
                            {order.orderID} {order.firstName} {order.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="productID">Product ID</label>
                    <input name="productID" type="number" required value={productID} onChange={e => setProductID(e.target.value)} />
                </div> */}
                <div className="form-group">
                    <label htmlFor="productID">Product</label>
                    <select name="productID" required onChange={e => setProductID(e.target.value)}>
                        <option value="" hidden>
                            -- Please choose an option --
                        </option>
                        {products.map((product) => (
                            <option key={product.productID} value={product.productID}>
                            {product.name}
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


export default OrderProductsCreate;