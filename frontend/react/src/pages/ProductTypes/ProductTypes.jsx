


import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { getProductTypes, deleteProductTypes } from "../../components/apiClient";
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

        deleteOrderStatuses(item);
        loadProductTypes();
    };
    useEffect(() => {
        loadProductTypes();
        
    }, []);
    return (
        <>

            <h1>ProductTypes</h1>

            <table>
                <thead>
                    <tr>
                        {productTypes.length > 0 && Object.keys(productTypes[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {productTypes.map((customer, index) => (
                        <TableRow key={index} rowObject={customer} refreshObjects={loadProductTypes} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>
            
               
       
        </>
    )
};
export default ProductTypes;
