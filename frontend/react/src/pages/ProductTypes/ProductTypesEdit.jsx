
import { useState } from "react";

function ProductTypesEdit({itemToEdit}) {
    const [productTypeID, setProductTypeID] = useState(itemToEdit.productTypeID);
    const [typeName, setTypeName] = useState(itemToEdit.typeName);
    return(
        <><h1>Edit ProductTypes</h1>
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