



import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getManufacturers, deleteManufacturer} from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

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

        deleteManufacturer(item);
        loadManufacturers();
    };
    useEffect(() => {
        loadManufacturers();
        
    }, []);

    return (
        <div className='main'>
            <h1>Manufacturers</h1>
            <p><Link to="/manufacturers/create">Add Manufacturer</Link></p>

            <table>
                <thead>
                    <tr>
                        {manufacturers.length > 0 && Object.keys(manufacturers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {manufacturers.map((manufacturer, index) => (
                        <TableRow key={index} rowObject={manufacturer} refreshObjects={loadManufacturers} onDelete={onDelete} onEdit={onEdit}/>
                    ))}

                </tbody>
            </table>

        </div>
    )
};



export default Manufacturers;




