
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getOrderProductsByOrder, deleteOrderProduct, getProducts, createOrderProduct} from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

function OrderProducts({itemToEdit}) {
    const [orderProducts, setOrderProducts] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(); 
    const [quantity, setQuantity] = useState();

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);

    };
    const loadOrderProducts = async () => {
        const data = await getOrderProductsByOrder(itemToEdit.orderID);
        setOrderProducts(data);
    };
    const onEdit= (orderProduct) => {
   
        

    };


    const onSubmit= async (e) => {
        e.preventDefault();
        const orderID = itemToEdit.orderID;
        const item = {orderID:orderID.orderID, product, quantity};
        await createOrderProduct(item);


    }
    const onDelete = async (item) => {
        await deleteOrderProduct(item);
        loadOrderProducts();
    };
    const tableHeaders = {
        orderProductsID: "Order Products ID",
        orderID: "Order ID",
        productID: "Product ID",
        productName: "Product Name",
        quantity: "Quantity"
    };

    useEffect(() => {
        loadOrderProducts();
        loadProducts();
    }, []);

    return (
        <div className='main'>
            <h1>Products</h1>
            <h2>Add Product To Order</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="AddProduct">Product</label>
                    <select name="AddProduct" onChange={setProduct}>
                        {products.map((product) => (
                            <option key={product.productID} value={product.productID}>
                            {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input name='quantity' type='number' value={quantity} onChange={e => setQuantity(e.target.value)}></input>

                </div>
                <div className="form-group actions">
                    <button type="submit">Add</button>
                </div>
            </form>

            <table>
                <thead>
                    <tr>
                        {orderProducts.length > 0 && Object.keys(orderProducts[0]).map((header, index) => (
                            <th key={index}>{tableHeaders[header]}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orderProducts.map((orderproduct, index) => (
                        <TableRow key={index} rowObject={orderproduct} refreshObjects={loadOrderProducts} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>

        </div>
    )
};



export default OrderProducts;



