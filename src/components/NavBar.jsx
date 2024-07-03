import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../User/Auth.jsx";

export function NavBar() {
    const { isAuthenticated, clearAuthToken } = useAuth();
    const [isActive, setIsActive] = useState(false);

    function handleLogout() {
        clearAuthToken();
    }

    function toggleMenu() {
        setIsActive(!isActive);
    }

    return (
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">TP2</Link>
                    <div className={`navbar-burger burger ${isActive ? "is-active" : ""}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                    <div className="navbar-end">
                        {!isAuthenticated && (
                            <>
                                <Link to="/signup" className="navbar-item" onClick={toggleMenu}>Sign Up</Link>
                                <Link to="/login" className="navbar-item" onClick={toggleMenu}>Login</Link>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <Link to="/favorite" className="navbar-item" onClick={toggleMenu}>Favorites</Link>
                                <Link to="/history" className="navbar-item" onClick={toggleMenu}>History</Link>
                                <Link to="/profile" className="navbar-item" onClick={toggleMenu}>Profile</Link>
                                <Link to="/login" onClick={() => { handleLogout(); toggleMenu(); }} className="navbar-item">Logout</Link>
                            </>
                        )}
                        <Link to="/about" className="navbar-item" onClick={toggleMenu}>About</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
