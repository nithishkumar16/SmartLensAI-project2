const express = require("express");
const axios = require("axios");
const router = express.Router();

const BING_API_KEY = "ac1e071c678d445d803f96e77896b7ab";

router.get("/recommendations", async (req, res) => {
    const { query } = req.query;

    console.log(req.query);

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        const response = await axios.get("https://api.bing.microsoft.com/v7.0/images/search", {
            headers: {
                "Ocp-Apim-Subscription-Key": BING_API_KEY,
            },
            params: {
                q: query,
                count: 10, // Number of results to return
            },
        });

        const recommendations = response.data.value.map((item) => ({
            title: item.name,
            link: item.hostPageUrl,
            image: item.thumbnailUrl,
        }));

        res.json(recommendations);
    } catch (error) {
        console.error("Error fetching recommendations:", error.message);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
});

module.exports = router;
