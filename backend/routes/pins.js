const express = require("express");
const axios = require("axios");
const path = require('path');
const vision = require("@google-cloud/vision");
const { Firestore } = require('@google-cloud/firestore');
const router = express.Router();

const client = new vision.ImageAnnotatorClient();

// Initialize Firestore with service account key
const firestore = new Firestore({
    projectId: 'project2-443005',
    keyFilename: path.join(__dirname, '../project2-443005-1e2f5698211a.json'),
});


const isTextValid = (text) => {
    if (text.length < 3) return false;

    const specialCharRatio = (text.match(/[^a-zA-Z0-9\s]/g) || []).length / text.length;
    if (specialCharRatio > 0.5) return false;

    const dictionaryRegex = /^[a-zA-Z0-9\s.,'!?-]+$/;
    if (!dictionaryRegex.test(text)) return false;

    return true;
};

// **Map Likelihoods to Readable Emotions**
const likelihoodToEmotion = (likelihood) => {
    const mappings = {
        VERY_LIKELY: "happy",
        LIKELY: "content",
        POSSIBLE: "neutral",
        UNLIKELY: "sad",
        VERY_UNLIKELY: "angry",
    };
    return mappings[likelihood] || likelihood;
};

// Function to retrieve stored image data from Firestore
async function getStoredImageIds(userId) {
    const snapshot = await firestore.collection(`users/${userId}/processedPhotos`).get();
    return new Set(snapshot.docs.map((doc) => doc.id));
}

// Function to store new images in Firestore
async function processAndStoreNewImages(userId, addedImageIds, pins) {
    const batch = firestore.batch();

    for (const pin of pins) {
        if (!addedImageIds.has(pin.id)) continue;

        const imageUrl = pin.media.images["600x"].url;
        const userName = pin.board_owner.username;

        const [visionResponse] = await client.annotateImage({
            image: { source: { imageUri: imageUrl } },
            features: [
                { type: "FACE_DETECTION" },
                { type: "LOGO_DETECTION" },
                { type: "TEXT_DETECTION" },
            ],
        });

        let detectedText = visionResponse.textAnnotations
            ? visionResponse.textAnnotations.map((text) => text.description).join(" ")
            : "";

        if (detectedText && !isTextValid(detectedText)) {
            detectedText = "";
        }

        // **Map Face Detection Likelihoods to Emotions**
        const faceEmotions = visionResponse.faceAnnotations?.map((face) => {
            return likelihoodToEmotion(face.joyLikelihood);
        }) || [];

        const analysis = {
            faces: faceEmotions,
            logos: visionResponse.logoAnnotations?.map((logo) => logo.description),
            text: detectedText,
        };

        const docRef = firestore.collection(`users/${userId}/processedPhotos`).doc(pin.id);
        batch.set(docRef, {
            userName,
            photoUrl: imageUrl,
            analysis,
            timestamp: Firestore.Timestamp.now(),
        });
    }

    await batch.commit();
    console.log(`New images processed and stored for user ${userId}.`);
}

async function removeDeletedImages(userId, deletedImageIds) {
    const batch = firestore.batch();

    deletedImageIds.forEach((id) => {
        const docRef = firestore.collection(`users/${userId}/processedPhotos`).doc(id);
        batch.delete(docRef);
    });

    await batch.commit();
    console.log(`Deleted images removed for user ${userId}.`);
}

// Route to fetch and process pins
router.get("/pins/:userId", async (req, res) => {
    const { userId } = req.params;


    if (!userId) {
        return res.status(400).send({ error: "User ID is required" });
    }

    if (!req.session.accessToken) {
        return res.status(401).send("User not authenticated");
    }


    try {
        const accessToken = req.session.accessToken
        const storedImageIds = await getStoredImageIds(userId);

        const pinterestResponse = await axios.get("https://api.pinterest.com/v5/pins", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const pins = pinterestResponse.data.items;
        const currentImageIds = new Set(pins.map((pin) => pin.id));

        const addedImageIds = new Set([...currentImageIds].filter((id) => !storedImageIds.has(id)));
        const deletedImageIds = new Set([...storedImageIds].filter((id) => !currentImageIds.has(id)));

        console.log("Added Image IDs:", [...addedImageIds]);
        console.log("Deleted Image IDs:", [...deletedImageIds]);

        if (addedImageIds.size > 0) {
            await processAndStoreNewImages(userId, addedImageIds, pins);
        }

        if (deletedImageIds.size > 0) {
            await removeDeletedImages(userId, deletedImageIds);
        }

        res.json(pins);
    } catch (error) {
        console.error("Error processing pins:", error);
        res.status(500).send({ error: "Failed to process pins" });
    }
});

module.exports = router;
