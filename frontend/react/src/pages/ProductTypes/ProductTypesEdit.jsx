
import { useState } from "react";

function ProductTypesEdit({itemToEditToEdit}) {
    const [productTypeID, setProductTypeID] = useState(itemToEdit.productTypeID);
    const [typeName, setTypeName] = useState(itemToEdit.typeName);
    return(
        <>
            <form>
                <label htmlFor="productTypeID">productTypeID:</label>
                <input name="productTypeID" type="number" value={productTypeID} onChange={setProductTypeID}/>

                <label htmlFor="typeName">typeName:</label>
                <input name="typeName" type="text" value={typeName} onChange={setTypeName} />
                <button>Save</button>
            </form>
        </>
    )
};

export default ProductTypesEdit;