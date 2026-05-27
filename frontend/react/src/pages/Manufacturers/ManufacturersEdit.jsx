import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

function ManufacturersEdit({itemToEdit}) {
    // use itemToEdit's value if available otherwise return empty string
    const [manufacturerID, setmanufacturerID] = useState(itemToEdit?.manufacturerID || "");
    const [brandName, setbrandName] = useState(itemToEdit?.brandName || "");
    const [country, setcountry] = useState(itemToEdit?.country || "");
    const [contactEmail, setcontactEmail] = useState(itemToEdit?.contactEmail || "");
    const [contactPhone, setcontactPhone] = useState(itemToEdit?.contactPhone || "");
    const navigate = useNavigate();
    
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const updatedManufacturer = {
            manufacturerID,
            brandName,
            country,
            contactEmail,
            contactPhone
        };
        console.log("updated manufacturer", updatedManufacturer);

        try {
            const response = await fetch(
                `http://localhost:3000/manufacturers/${manufacturerID}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedManufacturer),
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/manufacturers');
        } catch (error) {
            console.error("Error updating manufacturer:", error);
            alert("An error occurred while updating the manufacturer. Please try again.");
        }
    }
    return (
        <div className='main'>
            <h1>Edit Manufacturer</h1>
            <form action={`/manufacturers/${manufacturerID}`} method="POST" onSubmit={onSubmit}>
                {/* <div className="form-group">
                    <label htmlFor="manufacturerID">manufacturerID:</label>
                    <input name="manufacturerID" type="number" value={manufacturerID} onChange={setmanufacturerID} />
                </div> */}
                <div className="form-group">
                    <label htmlFor="brandName">Brand:</label>
                    <input name="brandName" type="text" value={brandName} onChange={e => setbrandName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input name="country" type="text" value={country} onChange={e => setcountry(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="contactEmail">Contact Email:</label>
                    <input name="contactEmail"type="text" value={contactEmail} onChange={e => setcontactEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="contactPhone">Contact Phone:</label>
                    <input name="contactPhone" type="text" value={contactPhone} onChange={e => setcontactPhone(e.target.value)} />
                </div>
                <div className="form-group actions">
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default ManufacturersEdit;