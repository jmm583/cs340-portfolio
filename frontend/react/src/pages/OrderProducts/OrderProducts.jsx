
import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getOrderProducts, deleteOrderProduct} from "../../components/apiClient";
import TableRow from '../../components/TableRow';


function OrderProducts({setItemToEdit}) {
    const [orderProducts, setOrderProducts] = useState([]);
    const navigate = useNavigate();
    const loadOrderProducts = () => {
        const data = getOrderProducts();
        setOrderProducts(data);
    }
    const onEdit= (orderProduct) => {
        setItemToEdit(orderProduct);
        navigate("/orderproducts/edit");

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
            <p><a href='/orderproducts/create'>Add OrderProduct</a></p>

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



