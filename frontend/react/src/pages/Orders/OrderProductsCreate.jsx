


import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createOrderProduct, getProducts } from "../../components/apiClient";

function OrderProductsCreate({order}) {

    const [productID, setProductID] = useState();
    const [quantity, setQuantity] = useState();
    const navigate = useNavigate();
    const [products, setProducts] = useState();
    const loadProducts = () => {
        setProducts(getProducts);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const ID = -1;
        const orderproduct = {ID, order.orderID, productID, quantity}
        createOrderProduct(orderproduct);
        navigate("/orders");

    }

    useEffect(() => {
        loadProducts();
        
    }, []);
    return (
        <div className='main'>
            <h1>Add OrderProducts</h1>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="productID">Product</label>
                    <select onChange={setProduct}>
                        {products.map((product) => (
                            <option key={product.productID} value={product.productID}>
                            {product.name}
                            </option>
                        ))}
                    </select>
                    <input name="productID" type="text" value={productID} onChange={e => setProductID(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input name="quantity" type="text" required value={quantity} onChange={e => setQuantity(e.target.value)} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
)};


export default OrderProductsCreate;