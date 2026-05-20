
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getOrderProducts, deleteOrderProduct} from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

function OrderProducts({setItemToEdit}) {
    const [orderProducts, setOrderProducts] = useState([]);
    const navigate = useNavigate();
    const loadOrderProducts = async () => {
        const data = await getOrderProducts();
        setOrderProducts(data);
    }
    const onEdit= (orderProduct) => {
        setItemToEdit(orderProduct);
        navigate("/orderproducts/edit");

    };
    const onDelete = async (item) => {

        await deleteOrderProduct(item);
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
        
    }, []);

    return (
        <div className='main'>
            <h1>OrderProducts</h1>
            <h2><Link to='/orderproducts/create'>Add OrderProduct</Link></h2>

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



