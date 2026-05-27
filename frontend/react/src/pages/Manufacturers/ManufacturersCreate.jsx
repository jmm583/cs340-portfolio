
import { useState, useEffect } from "react";
import { createManufacturer } from "../../components/apiClient";
import { useNavigate } from "react-router";

function ManufacturersCreate() {
    const navigate = useNavigate();
    const [manufacturerID, setManufacturerID] = useState();
    const [brandName, setBrandName] = useState();
    const [country, setCountry] = useState();
    const [contactEmail, setContactEmail] = useState();
    const [contactPhone, setContactPhone] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        const newManufacturer = {
            manufacturerID, 
            brandName, 
            country, 
            contactEmail, 
            contactPhone
        };
        console.log("created manufacturer", newManufacturer); 
        try {
            const response = await fetch(
                `http://localhost:3000/manufacturers`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newManufacturer),
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/manufacturers');
        } catch (error) {
            console.error("Error creating manufacturer:", error);
            alert("An error occurred while creating the manufacturer. Please try again.");
        }  

    }
    return (
        <div className='main'>
            <h1>Add Manufacturer</h1>
            <form action="/manufacturers" method="POST" onSubmit={onSubmit}>
                {/* <label htmlFor="manufacturerID">manufacturerID:</label>
                <input name="manufacturerID" type="number" value={manufacturerID} onChange={ e => setmanufacturerID(e.target.value)} /> */}
                <div className="form-group">
                    <label htmlFor="brandName">Brand:</label>
                    <input name="brandName" type="text" value={brandName} onChange={e => setBrandName(e.target.value)} />

                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input name="country" type="text" value={country} onChange={e => setCountry(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="contactEmail">Contact Email:</label>
                    <input name="contactEmail"type="text" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="contactPhone">Contact Phone:</label>
                    <input name="contactPhone" type="text" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default ManufacturersCreate;