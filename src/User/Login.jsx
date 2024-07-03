import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth.jsx";
import { svrURL } from "../components/constants.js";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setAuthToken } = useAuth();

    async function handleLogin() {
        setError("");
        try {
            const response = await fetch(`${svrURL}/auth/token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Failed to login");
            }

            const data = await response.json();
            setAuthToken(data.token);
            sessionStorage.setItem("authToken", data.token); 

            navigate("/"); 
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="container">
            <div className="section">
                <div className="content">
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        {error && <p className="help is-danger">{error}</p>}
                        <div className="control">
                            <button className="button is-success" onClick={handleLogin}>Login</button>
                            <Link to="/" className="button is-danger">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
