const axios = require("axios");
const { Firestore } = require("@google-cloud/firestore");
const path = require("path");

// Initialize Firestore with service account key
const firestore = new Firestore({
    projectId: "project2-443005",
    keyFilename: path.join(__dirname, "../project2-443005-1e2f5698211a.json"),
});

const CLIENT_ID = process.env.PINTEREST_CLIENT_ID || "1507835";
const CLIENT_SECRET = process.env.PINTEREST_CLIENT_SECRET || "d3f861d46633f56c483ec08785879ca4c2e03568";

/**
 * Refreshes the access token using the refresh token
 * @param {string} userId - The user ID for whom the token is being refreshed
 * @param {string} refreshToken - The refresh token for the user
 * @returns {string} - The new access token
 */
const refreshAccessToken = async (userId, refreshToken) => {
    try {
        const response = await axios.post("https://api.pinterest.com/v5/oauth/token", {
            grant_type: "refresh_token",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: refreshToken,
        });

        const { access_token, refresh_token, expires_in } = response.data;

        // Update Firestore with new tokens
        const docRef = firestore.collection("userTokens").doc(userId);
        await docRef.update({
            accessToken: access_token,
            refreshToken: refresh_token || refreshToken, // Use new refresh token if provided
            expiresAt: Date.now() + expires_in * 1000, // Update expiry time
        });

        console.log("Access token refreshed successfully for user:", userId);
        return access_token;
    } catch (error) {
        console.error("Failed to refresh access token:", error.response?.data || error.message);
        throw new Error("Unable to refresh access token");
    }
};

module.exports = { refreshAccessToken };
