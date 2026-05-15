
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getOrderProductsByOrder, deleteOrderProduct, getProducts} from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

function OrderProducts({itemToEdit}) {
    const [orderProducts, setOrderProducts] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState(); 
    const loadProducts = () => {
        setProducts(getProducts());

    };
    const loadOrderProducts = () => {
        const data = getOrderProductsByOrder(itemToEdit.orderID);
        setOrderProducts(data);
    };
    const onEdit= (orderProduct) => {
   
        

    };


    const onSubmit=(e) => {
        e.preventDefault();

    }
    const onDelete = (item) => {

        deleteOrderProduct(item);
        loadOrderProducts();
    };
    const tableHeaders = {
        orderProductsID: "Order Products ID",
        orderID: "Order ID",
        Customer: "Customer",
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
                    <select name="AddProduct" onChange={setAddProduct}>
                        {products.map((product) => (
                            <option key={product.productID} value={product.productID}>
                            {product.name}
                            </option>
                        ))}
                    </select>
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



