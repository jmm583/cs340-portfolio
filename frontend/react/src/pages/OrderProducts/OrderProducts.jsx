
import { useState, useEffect } from "react";
import {getOrderProducts} from "../../components/apiClient";
import OrderProductsRow from "./OrderProductsRow";

function OrderProducts() {
    const [orderProducts, setOrderProducts] = useState([]);

    const loadOrderProducts = () => {
        const data = getOrderProducts();
        setOrderProducts(data);
    }
    useEffect(() => {
        loadOrderProducts();
        
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>orderProductsID</th>
                        <th>orderID</th>
                        <th>productID</th>
                        <th>quantity</th>

                    </tr>
                </thead>
                <tbody>

                    {orderProducts.map((item) => (<OrderProductsRow key={item.orderProductsID} item={item} />))}


                </tbody>
            </table>

        </>
    )
};



export default OrderProducts;



