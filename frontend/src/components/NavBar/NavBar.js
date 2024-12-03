import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './NavBar.css';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check login status by verifying session or token
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/backend/auth/status", {
          credentials: "include", // Include cookies for session
        });
        const data = await response.json();
        setIsLoggedIn(data.loggedIn); // Update state based on response
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/backend/auth/logout", {
        method: "GET",
        credentials: "include", // Include session cookies
      });

      if (response.ok) {
        setIsLoggedIn(false); // Update state after logout
        navigate("/"); // Redirect to homepage
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontSize: "24px", fontWeight: "bold" }}
        >
          SmartLens AI
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              style={{ fontSize: "18px" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={location.pathname === "/dashboard" ? "active" : ""}
              style={{ fontSize: "18px" }}
            >
              Dashboard
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link
                as="button"
                onClick={handleLogout}
                style={{
                  fontSize: "18px",
                  background: "none",
                  border: "none",
                  color: "inherit",
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className={location.pathname === "/login" ? "active" : ""}
                style={{ fontSize: "18px" }}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
