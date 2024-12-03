import React from "react";
import "./Login.css"; // Import the CSS

const Login = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:5000/backend/auth/login"; // Redirect to backend login endpoint
    };

    return (
        <div className="login-container">
            <h1>Welcome to SmartLens AI</h1>
            <p>Log in with Pinterest to explore your personalized dashboard and insights.</p>
            <button onClick={handleLogin} className="login-button">
                Log in with Pinterest
            </button>
        </div>
    );
};

export default Login;
