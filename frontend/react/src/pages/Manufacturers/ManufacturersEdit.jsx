import { useState } from "react";

function ManufacturersEdit({itemToEdit}) {
    const [manufacturerID, setmanufacturerID] = useState(itemToEdit.manufacturerID);
    const [brandName, setbrandName] = useState(itemToEdit.brandName);
    const [country, setcountry] = useState(itemToEdit.country);
    const [contactEmail, setcontactEmail] = useState(itemToEdit.contactEmail);
    const [contactPhone, setcontactPhone] = useState(itemToEdit.contactPhone);
    return (
        <>
            <form>
                <label htmlFor="manufacturerID">manufacturerID:</label>
                <input name="manufacturerID" type="number" value={manufacturerID} onChange={setmanufacturerID} />
                <label htmlFor="brandName">brandName:</label>
                <input name="brandName" type="text" value={brandName} onChange={setbrandName} />
                <label htmlFor="country">country:</label>
                <input name="country" type="text" value={country} onChange={setcountry}/>
                <label htmlFor="contactEmail">contactEmail:</label>
                <input name="contactEmail"type="text" value={contactEmail} onChange={setcontactEmail} />
                <label htmlFor="contactPhone">contactPhone:</label>
                <input name="contactPhone" type="text" value={contactPhone} onChange={setcontactPhone} />
                <button>Save</button>
            </form>
        </>
    )
}

export default ManufacturersEdit;