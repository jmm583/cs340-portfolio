

import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { getProducts, deleteProducts } from "../../components/apiClient";
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

        deleteProducts(item);
        loadProducts();
    };
    useEffect(() => {
        loadProducts();
        
    }, []);
    return (
        <>

            <h1>Products</h1>

            <table>
                <thead>
                    <tr>
                        {products.length > 0 && Object.keys(products[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
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



