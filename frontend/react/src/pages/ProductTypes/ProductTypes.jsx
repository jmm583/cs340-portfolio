


import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { getProductTypes, deleteProductType } from "../../components/apiClient";
import TableRow from '../../components/TableRow';

function ProductTypes({setItemToEdit}) {
    const [productTypes, setProductTypes] = useState([]);
    const navigate = useNavigate();

    const loadProductTypes = () => {
        const data = getProductTypes();
        setProductTypes(data);
    };
    const onEdit = (item) =>{
 
        setItemToEdit(item);
        navigate('/productTypes/edit');
    };
    const onDelete = (item) => {

        deleteProductType(item);
        loadProductTypes();
    };
    useEffect(() => {
        loadProductTypes();
        
    }, []);
    return (
        <div className='main'>
            <h1>ProductTypes</h1>
            <p><a href="/producttypes/create">Add ProductType</a></p>

            <table>
                <thead>
                    <tr>
                        {productTypes.length > 0 && Object.keys(productTypes[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {productTypes.map((customer, index) => (
                        <TableRow key={index} rowObject={customer} refreshObjects={loadProductTypes} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>
            
               
       
        </div>
    )
};
export default ProductTypes;
