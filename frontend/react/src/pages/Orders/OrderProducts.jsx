
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getOrderProductsByOrder, deleteOrderProduct} from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

function OrderProducts({itemToEdit}) {
    const [orderProducts, setOrderProducts] = useState([]);
    const navigate = useNavigate();
    const loadOrderProducts = () => {
        const data = getOrderProductsByOrder(itemToEdit.orderID);
        setOrderProducts(data);
    }
    const onEdit= (orderProduct) => {
   
        

    };
    const onDelete = (item) => {

        deleteOrderProduct(item);
        loadOrderProducts();
    };
    useEffect(() => {
        loadOrderProducts();
        
    }, []);

    return (
        <div className='main'>
            <h1>OrderProducts</h1>
            <h2><Link to='/order/orderproductscreate'>Add Product</Link></h2>

            <table>
                <thead>
                    <tr>
                        {orderProducts.length > 0 && Object.keys(orderProducts[0]).map((header, index) => (
                            <th key={index}>{header}</th>
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



