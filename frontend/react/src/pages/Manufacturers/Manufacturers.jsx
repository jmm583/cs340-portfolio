



import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getManufacturers, deleteManufacturers} from "../../components/apiClient";
import TableRow from '../../components/TableRow';


function Manufacturers({setItemToEdit}) {
    const [manufacturers, setManufacturers] = useState([]);
    const navigate = useNavigate();
    const loadManufacturers = () => {
        const data = getManufacturers();
        setManufacturers(data);
    }
    const onEdit= (orderProduct) => {
        setItemToEdit(orderProduct);
        navigate("/manufacturers/edit");

    };
    const onDelete = (item) => {

        deleteManufacturers(item);
        loadManufacturers();
    };
    useEffect(() => {
        loadManufacturers();
        
    }, []);

    return (
        <>
            <h1>Manufacturers</h1>

            <table>
                <thead>
                    <tr>
                        {manufacturers.length > 0 && Object.keys(manufacturers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {manufacturers.map((manufacturer, index) => (
                        <TableRow key={index} rowObject={manufacturer} refreshObjects={loadManufacturers} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>

        </>
    )
};



export default Manufacturers;




