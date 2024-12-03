const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config(); // Load .env variables
const pinsRouter = require("./routes/pins"); // Adjust the path as needed
const imageRouter = require("./routes/imagePage");
const recommendationRouter = require("./routes/recommendation");
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profile");

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to `true` if using HTTPS
    })
);

app.use(
    cors({
        origin: "http://localhost:3000", // Replace with your frontend URL
        credentials: true, // Allow credentials (cookies, headers)
    })
);


app.use(express.json());

// Use the pins route
app.use("/backend/", pinsRouter);
app.use("/backend/i", imageRouter);
app.use("/backend/r", recommendationRouter);
app.use("/backend/auth", authRouter);
app.use("/backend/user", profileRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
