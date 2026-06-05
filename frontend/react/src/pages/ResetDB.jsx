import { useState } from "react";
import { performReset } from "../components/apiClient";

function ResetDB() {
    const [confirm, setConfirm] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const lowerConfirm = confirm.toLowerCase();
        if (lowerConfirm === "confirm") {
            await performReset();
            alert("Completed Reset"); 
            setConfirm("");
        }
    };
    return (
       
        <div className='main'>
            <h1>Reset DB</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="confirm">Enter "Confirm" to confirm intention to reset Database then click Reset</label>
                    <input name="confirm" type="text" value={confirm} onChange={e => setConfirm(e.target.value)} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Reset Database</button>
                </div>
            </form>
        </div>
        
        
    )
};
export default ResetDB;