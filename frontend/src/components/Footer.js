import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              SmartLens AI provides cutting-edge visual analytics for modern
              retailers to improve customer engagement and inventory management.
            </p>
          </div>
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p>Email: support@smartlensai.com</p>
            <p>Phone: +1-800-123-4567</p>
            <p>Location: San Francisco, CA</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2024 SmartLens AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
