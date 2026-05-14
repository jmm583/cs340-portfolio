import { useState } from "react";

function ManufacturersEdit({itemToEdit}) {
    const [manufacturerID, setmanufacturerID] = useState(itemToEdit.manufacturerID);
    const [brandName, setbrandName] = useState(itemToEdit.brandName);
    const [country, setcountry] = useState(itemToEdit.country);
    const [contactEmail, setcontactEmail] = useState(itemToEdit.contactEmail);
    const [contactPhone, setcontactPhone] = useState(itemToEdit.contactPhone);
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='main'>
            <h1>Edit Manufacturer</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="manufacturerID">manufacturerID:</label>
                    <input name="manufacturerID" type="number" value={manufacturerID} onChange={setmanufacturerID} />
                </div>
                <div className="form-group">
                    <label htmlFor="brandName">brandName:</label>
                    <input name="brandName" type="text" value={brandName} onChange={setbrandName} />
                </div>
                <div className="form-group">
                    <label htmlFor="country">country:</label>
                    <input name="country" type="text" value={country} onChange={setcountry}/>
                </div>
                <div className="form-group">
                    <label htmlFor="contactEmail">contactEmail:</label>
                    <input name="contactEmail"type="text" value={contactEmail} onChange={setcontactEmail} />
                </div>
                <div className="form-group">
                    <label htmlFor="contactPhone">contactPhone:</label>
                    <input name="contactPhone" type="text" value={contactPhone} onChange={setcontactPhone} />
                </div>
                <div className="form-group actions">
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default ManufacturersEdit;