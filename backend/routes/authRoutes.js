const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config(); // For environment variables

const CLIENT_ID = process.env.PINTEREST_CLIENT_ID
const CLIENT_SECRET = process.env.PINTEREST_CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI


// Helper to encode client_id:client_secret as base64
const getBasicAuthHeader = () => {
    const base64Credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    return `Basic ${base64Credentials}`;
};

// Redirect user to Pinterest login
router.get("/login", (req, res) => {
    const pinterestAuthUrl = `https://www.pinterest.com/oauth/?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_accounts:read,boards:read,pins:read`;
    console.log("Redirecting to Pinterest Auth URL:", pinterestAuthUrl);
    res.redirect(pinterestAuthUrl);
});

// Handle Pinterest OAuth callback
router.get("/callback", async (req, res) => {
    const { code } = req.query; // Get the authorization code from the query string

    if (!code) {
        console.error("Authorization code not provided.");
        return res.status(400).send({ error: "Authorization code not provided" });
    }

    try {
        // Exchange code for an access token
        const response = await axios.post(
            "https://api.pinterest.com/v5/oauth/token",
            new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: REDIRECT_URI,
            }).toString(), // Properly format the body
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: getBasicAuthHeader(), // Use Basic Auth header
                },
            }
        );

        req.session.accessToken = response.data.access_token; // You can save the access token to your session or database here
        console.log("Access token stored in session:", req.session.accessToken);

        res.redirect("http://localhost:3000/dashboard");
    } catch (error) {
        console.error("Error during token exchange:", error);
        res.status(500).send("Internal server error");
    }
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).send("Could not log out. Please try again.");
            }
            // Redirect to the client-side app after logout
            res.status(200).send("Logged out successfully");
        });
    } else {
        res.status(200).send("No active session to log out from.");
    }
});

router.get("/status", (req, res) => {
    if (req.session && req.session.accessToken) {
        return res.json({ loggedIn: true });
    }
    return res.json({ loggedIn: false });
});


module.exports = router;
