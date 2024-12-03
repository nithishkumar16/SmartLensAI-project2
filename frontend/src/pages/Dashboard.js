import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState([]);
    const [pins, setPins] = useState([]); // All pins fetched
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track errors
    const [recommendation, setRecommendation] = useState(null); // Store the recommendation message

    // Fetch user data and pins from the backend
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true at the start
            try {
                const profileResponse = await axios.get("http://localhost:5000/backend/user/profile", {
                    withCredentials: true, // Include cookies in the request
                });
                const profile = profileResponse.data;
                setUserProfile(profile);

                const pinsResponse = await axios.get(`http://localhost:5000/backend/pins/${profile.id}`, {
                    withCredentials: true, // Include cookies in the request
                });
                setPins(pinsResponse.data);
                setLoading(false); // Set loading to false after successful fetch
            } catch (err) {
                console.error("Error fetching data:", err.message);
                setError("Failed to load data. Please try again.");
                setLoading(false); // Set loading to false if an error occurs
            }
        };

        fetchData();
    }, []);

    const handleRecommendation = () => {
        setRecommendation(
            "Based on the analysis, focus on highlighting logos prominently and use cheerful faces to improve user engagement. Include text descriptions that emphasize brand values."
        );
    };

    return (
        <div className="pinterest-container">
            <div className="welcome-section">
                {userProfile.profile_image && (
                    <img
                        src={userProfile.profile_image}
                        alt={userProfile.username || "User"}
                        className="user-avatar"
                    />
                )}
                <h1 className="welcome-title">
                    Welcome, {userProfile.username || "Guest"}!
                </h1>
                <p className="user-stats">
                    Total Pins: {userProfile.totalPins || 0} | Boards: {userProfile.totalBoards || 0} | Followers: {userProfile.totalFollowers || 0}
                </p>
            </div>


            <div className="grid-container">
                <h1 className="grid-title">Your Pins</h1>

                {loading ? (
                    <p>Loading...</p> // Show loading message while data is being fetched
                ) : error ? (
                    <p className="error-message">{error}</p> // Display error message if fetching fails
                ) : pins.length > 0 ? (
                    <div className="grid">
                        {pins.map((pin, index) => (
                            <div key={index} className="grid-item">
                                <img
                                    src={pin.media.images["600x"].url}
                                    alt={pin.description || `Pin ${index + 1}`}
                                    className="grid-image"
                                    onClick={() => navigate(`/user/${userProfile.id}/image/${pin.id}`)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No pins found. <a href="/add-pins">Add new pins</a></p> // Show "Add new pins" message if no pins
                )}

            </div>
        </div>
    );
};

export default Dashboard;
