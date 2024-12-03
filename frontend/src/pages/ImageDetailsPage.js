import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/ImageDetailsPage.css";

const ImageDetailsPage = () => {
    const { userid, id } = useParams();
    const [imageDetails, setImageDetails] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchImageDetails = async () => {
            console.log("Fetching details for UserID:", userid, "PinID:", id); // Debugging
            try {
                const response = await axios.get(`http://localhost:5000/backend/i/user/${userid}/image/${id}`);
                setImageDetails(response.data);

                if (response.data.analysis?.logos) {
                    const formattedQuery = formatLogosForQuery(response.data.analysis.logos);
                    fetchRecommendations(formattedQuery);
                }

            } catch (error) {
                console.error("Error fetching image details:", error.message);
            }
        };

        const fetchRecommendations = async (query) => {

            try {
                const response = await axios.get("http://localhost:5000/backend/r/recommendations", {
                    params: { query },
                });
                setRecommendations(response.data);
            } catch (error) {
                console.error("Error fetching recommendations:", error.message);
            }
        };

        fetchImageDetails();
    }, [userid, id]);

    const formatLogosForQuery = (logos) => {
        // Filter out any empty or invalid logo strings
        const validLogos = logos.filter((logo) => typeof logo === "string" && logo.trim().length > 0);

        // Join logos into a single query string
        const query = validLogos.join(" ");

        // Add context for better search results
        const contextualQuery = `best dresses or items related to ${query}`;
        console.log("Formatted Query:", contextualQuery); // Debugging
        return contextualQuery;
    };

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    if (!imageDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="image-details-container">
            {/* Main Image and Analysis */}
            <div className="main-section">
                <div className="image-section">
                    <img src={imageDetails.photoUrl} alt="Selected" className="selected-image" />
                </div>

                <div className="details-section">
                    <h2>Customer Behavior Insights</h2>
                    <div className="analysis-section">
                        <h4>Emotional Trends</h4>
                        <ul className="results-list">
                            {imageDetails.analysis.faces.map((face, index) => (
                                <li key={index} className="result-item">{face}</li>
                            ))}
                        </ul>

                        <h4>Brand Recognition</h4>
                        <ul className="results-list">
                            {imageDetails.analysis.logos.map((logo, index) => (
                                <li key={index} className="result-item">{logo}</li>
                            ))}
                        </ul>

                        <h4>Product Label Insights</h4>
                        <p className="result-text">{imageDetails.analysis.text}</p>
                    </div>
                </div>
            </div>

            {/* Recommendations Section */}
            <div className="recommendations-section">
                <h2>Similar Products</h2>
                <div className="carousel-container">
                    <button className="carousel-button left" onClick={() => scrollCarousel("left")}>
                        &#9664;
                    </button>
                    <div className="carousel" ref={carouselRef}>
                        {recommendations.map((rec, index) => (
                            <div key={index} className="recommendation-item">
                                <a href={rec.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={rec.image}
                                        alt={rec.title}
                                        className="recommendation-image"
                                    />
                                </a>
                                <p>{rec.title}</p>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-button right" onClick={() => scrollCarousel("right")}>
                        &#9654;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageDetailsPage;
