import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Homepage.css";
import HeroSection from "../components/HeroSection";

const Features = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the login page
  };
  return (
    <>
      <HeroSection />
      <section id="intro" className="container">
        <div className="row">
          <div className="col-md-4">
            <section>
              <div className="icon-container">
                <i className="fa fa-smile"></i>
              </div>
              <h2>Emotional Analysis</h2>
              <p>
                Detect facial expressions like joy, anger, and surprise to
                understand customer emotions and improve product placements.
              </p>
            </section>
          </div>
          <div className="col-md-4">
            <section className="middle">
              <div className="icon-container">
                <i className="fa fa-tags"></i>
              </div>
              <h2>Product Interactions</h2>
              <p>
                Extract product information from labels to gain insights into
                customer preferences and optimize inventory management.
              </p>
            </section>
          </div>
          <div className="col-md-4">
            <section>
              <div className="icon-container">
                <i className="fa fa-briefcase"></i>
              </div>
              <h2>Brand Engagement</h2>
              <p>
                Identify brand logos in photos to track visibility and customer
                engagement, enabling data-driven marketing strategies.
              </p>
            </section>
          </div>
        </div>
        <footer>
          <button className="btn btn-dark button me-2" onClick={handleGetStarted}>Get Started</button>
        </footer>
      </section>
    </>
  );
};

export default Features;
