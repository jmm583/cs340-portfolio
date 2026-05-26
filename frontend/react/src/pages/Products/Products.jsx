

import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

function Products({setItemToEdit}) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // const loadProducts = () => {
    //     const data = getProducts();
    //     setProducts(data);
    // };
    const loadProducts = async () => {
        const data = await getProducts();
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

     const tableHeaders = {
        productID: "Product ID",
        manufacturerID: "Manufacturer ID",
        brandName: "Brand Name",
        productType: "Product Type",
        name: "Name",
        price: "Price",
        description: "Description",
        SKU: "SKU"
    };

    return (
        <div className='main'>
            <h1>Products</h1>
            <h2><Link to="/products/create">Add Product</Link></h2>
            <table>
                <thead>
                    <tr>
                        {products.length > 0 && Object.keys(products[0]).map((header, index) => (
                            <th key={index}>{tableHeaders[header]}</th>
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
            
               
       
        </div>
    )
};
export default Products;



