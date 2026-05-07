

import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../components/apiClient";
import TableRow from '../../components/TableRow';

function Products({setItemToEdit}) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const loadProducts = () => {
        const data = getProducts();
        setProducts(data);
    };
    const onEdit = (item) =>{
 
        setItemToEdit(item);
        navigate('/products/edit');
    };
    const onDelete = (item) => {
        setProducts(deleteProduct(item));
 
        console.log("deleted Product", item.productID)

    };
    useEffect(() => {
        loadProducts();
        
    }, []);
    return (
        <>

            <h1>Products</h1>
            <p><a href="/products/create">Add Product</a></p>
            <table>
                <thead>
                    <tr>
                        {products.length > 0 && Object.keys(products[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product, index) => (
                        <TableRow key={index} rowObject={product} refreshObjects={loadProducts} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>
            
               
       
        </>
    )
};
export default Products;



