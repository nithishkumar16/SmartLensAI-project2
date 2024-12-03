const express = require("express");
const { Firestore } = require('@google-cloud/firestore');
const path = require('path');
const router = express.Router();

const firestore = new Firestore({
    projectId: 'project2-443005',
    keyFilename: path.join(__dirname, '../project2-443005-1e2f5698211a.json'),
});

// Route to get image details by ID and userId
router.get("/user/:userId/image/:id", async (req, res) => {
    const { userId, id } = req.params;

    try {
        // Fetch image details for the specified user from Firestore
        const doc = await firestore.collection(`users/${userId}/processedPhotos`).doc(id).get();

        if (!doc.exists) {
            return res.status(404).send({ error: "Image not found for the specified user" });
        }

        res.json(doc.data());
    } catch (error) {
        console.error("Error fetching image details:", error.message);
        res.status(500).send({ error: "Failed to fetch image details" });
    }
});

module.exports = router;
