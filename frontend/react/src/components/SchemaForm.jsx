import SchemaFormRow from "./SchemaFormRow";

function SchemaForm(items){

    return(
        <>
            {items.map((item) => <SchemaFormRow name={item["field_name"]} type={item["type"]} />) }
        </>
    )
};
export default SchemaForm;