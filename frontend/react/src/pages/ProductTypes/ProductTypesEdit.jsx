
import { useState } from "react";

function ProductTypesEdit({itemToEdit}) {
    const [productTypeID, setProductTypeID] = useState(itemToEdit.productTypeID);
    const [typeName, setTypeName] = useState(itemToEdit.typeName);
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <div className='main'>
            <h1>Edit ProductTypes</h1>
            <form onSubmit={onSubmit}>
             
                <div className="form-group">
                    <label htmlFor="productTypeID">productTypeID:</label>
                    <input name="productTypeID" type="number" value={productTypeID} onChange={setProductTypeID}/>
                </div>
                <div className="form-group">
                    <label htmlFor="typeName">typeName:</label>
                    <input name="typeName" type="text" value={typeName} onChange={setTypeName} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button>
                </div>

            </form>
        </div>
    )
};

export default ProductTypesEdit;