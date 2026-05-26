



import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import {getManufacturers, deleteManufacturer} from "../../components/apiClient";
import TableRow from '../../components/TableRow';
import { Link } from 'react-router';

function Manufacturers({setItemToEdit}) {
    const [manufacturers, setManufacturers] = useState([]);
    const navigate = useNavigate();

    // const loadManufacturers = () => {
    //     const data = getManufacturers();
    //     setManufacturers(data);
    // }

    const loadManufacturers = async () => {
        const data = await getManufacturers();
        setManufacturers(data);
    };

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

    const tableHeaders = {
        manufacturerID: "Manufacturer ID",
        brandName: "Manufactuer Name",
        country: "Country",
        contactEmail: "Contact Email",
        contactPhone: "Contact Phone"
        };

    return (
        <div className='main'>
            <h1>Manufacturers</h1>
            <h2><Link to="/manufacturers/create">Add Manufacturer</Link></h2>

            <table>
                <thead>
                    <tr>
                        {manufacturers.length > 0 && Object.keys(manufacturers[0]).map((header, index) => (
                            <th key={index}>{tableHeaders[header]}</th>
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




