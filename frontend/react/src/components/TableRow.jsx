// Citation
// Date: May 5, 2026
// This file is adapted from the course content CS 340
// https://canvas.oregonstate.edu/courses/2042369/pages/exploration-web-application-technology-2?module_item_id=26640188
// Edit and Delete columns were added.


const TableRow = ({ rowObject, refreshObjects, onEdit, onDelete }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td><button onClick={ e => {e.preventDefault(); onEdit(rowObject); }}>Edit</button></td>
            <td><button onClick={e => {e.preventDefault(); onDelete(rowObject); }}>Delete</button></td>
            

        </tr>
    );
};

export default TableRow;