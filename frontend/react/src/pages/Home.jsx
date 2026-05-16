

import { useState } from "react";
import { performReset } from "../components/apiClient";

function Home() {
    const [confirm, setConfirm] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const lowerConfirm = confirm.toLowerCase();
        if (lowerConfirm === "confirm") {
            performReset();
            console.log("reset");
        }
    };

    return (
        <>
            <div className='main'>
            <h1>Home Page</h1>
            
                <p>Welcome to the NobleGoldfish Admin site.</p>
                <ul>
                    <li>Manufacturers - Admin for Manufacturers table</li>
                    <li>Products - Admin for Products table</li>
                    <li>Customers - Admin for Customers table</li>
                    <li>Orders - Admin for Orders table</li>
                    <li>OrderProducts - Admin for direct OrderProducts Table</li>
                </ul>
                <div>
                    <h1>Reset</h1>
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
            </div>
            


        </>
    )
};
export default Home;