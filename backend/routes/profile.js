const express = require("express");
const session = require("express-session");
const axios = require("axios");
const router = express.Router();
const app = express();
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set secure cookies in production
    })
);

const fetchFromPinterest = async (url, accessToken) => {
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

router.get("/profile", async (req, res) => {

    if (!req.session.accessToken) {
        return res.status(401).send("User not authenticated");
    }

    const accessToken = req.session.accessToken;

    try {

        // Fetch user account details
        const userResponse = await fetchFromPinterest("https://api.pinterest.com/v5/user_account", accessToken);

        const { profile_image, username, id } = userResponse;

        // Fetch boards
        const boardsResponse = await fetchFromPinterest("https://api.pinterest.com/v5/boards", accessToken);
        const totalBoards = boardsResponse.items?.length || 0;

        // Fetch pins
        const pinsResponse = await fetchFromPinterest("https://api.pinterest.com/v5/pins", accessToken);
        const totalPins = pinsResponse.items?.length || 0;

        // Fetch followers
        const followersResponse = await fetchFromPinterest("https://api.pinterest.com/v5/user_account/followers", accessToken);
        const totalFollowers = followersResponse.items?.length || 0;

        res.json({
            username,
            id,
            profile_image,
            totalPins,
            totalBoards,
            totalFollowers,
        });
    } catch (error) {
        console.error("Error fetching Pinterest data:", error.message);
        res.status(500).send({ error: "Failed to fetch Pinterest data" });
    }
});

module.exports = router;
