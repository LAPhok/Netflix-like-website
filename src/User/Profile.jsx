import { useState, useEffect } from "react";
import { svrURL } from "../components/constants.js";
import { useAuth } from "./Auth.jsx";

export function Profile() {
    const { authToken } = useAuth();
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (authToken) {
            fetchUserData();
        }
    }, [authToken]);

    async function fetchUserData() {
        try {
            const response = await fetch(`${svrURL}/user`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setUsername(data.username);
                setEmail(data.email);
            } else {
                throw new Error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message);
            setError("Failed to fetch user data");
        }
    }

    async function updateUser() {
        try {
            const response = await fetch(`${svrURL}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (response.ok) {
                setError("");
                setSuccessMessage("User information updated successfully!");
                fetchUserData(); 
            } else {
                const data = await response.json();
                setError(data.message || "Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to update user");
        }
    }

    return (
        <div className="container">
            {userData && (
                <div className="box">
                    <h2 className="title">Profile</h2>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                                className="input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-primary" onClick={updateUser}>Update</button>
                        </div>
                    </div>
                    {successMessage && <p className="help is-success">{successMessage}</p>}
                    {error && <p className="help is-danger">{error}</p>}
                </div>
            )}
        </div>
    );
}
