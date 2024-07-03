import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { svrURL } from "../components/constants.js";

export function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signedUp, setSignedUp] = useState(false);
    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false); 

    useEffect(() => {
        if (signedUp) {
            setRedirect(true);
        }
    }, [signedUp]);

    async function handleSignUp() {
        try {
            const response = await fetch(`${svrURL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password }),
            });

            if (response.ok) {
                setSignedUp(true);
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            console.error("Error signing up:", error);
            setError("Failed to sign up");
        }
    }

    return (
        <div className="container">
            {signedUp ? (
                <div>
                    <p className="title is-4">Registration successful!</p>
                    {redirect ? (
                        <Link to="/login" className="button is-primary">Go to Login Page</Link>
                    ) : null}
                </div>
            ) : (
                <div>
                    <h2 className="title is-3">Sign Up</h2>
                    {error && <p className="help is-danger">{error}</p>}
                    <form onSubmit={handleSignUp}>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" type="submit">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
