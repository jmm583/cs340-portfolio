
import { useState } from "react";
import { useNavigate } from "react-router";
import { createProductType } from "../../components/apiClient";

function ProductTypesCreate() {
    const [productTypeID, setProductTypeID] = useState();
    const [typeName, setTypeName] = useState();
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        const ID = -1;
        const productType = {ID, typeName};
        createProductType(productType);
        navigate("/producttypes");

    }
    return(
        <><h1>Add ProductTypes</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="productTypeID">productTypeID:</label>
                <input name="productTypeID" type="number" value={productTypeID} onChange={setProductTypeID}/> */}

                <label htmlFor="typeName">typeName:</label>
                <input name="typeName" type="text" value={typeName} onChange={e => setTypeName(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        </>
    )
};

export default ProductTypesCreate;