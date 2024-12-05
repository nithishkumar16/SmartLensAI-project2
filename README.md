Welcome to SmartLens AI 2.0—a powerful tool tailored for social media influencers who aim to enhance their brand visibility, understand audience engagement, and boost their content strategy using visual analytics.

Application URL: https://frontend2-dot-project2-443005.wl.r.appspot.com/

## Overview:

As a social media influencer, staying ahead in today’s digital landscape requires deep insights into your audience and brand partnerships. SmartLens AI 2.0 empowers you to analyze your online presence and maximize your impact by using advanced AI-driven analytics.

This application transforms the way influencers like you understand engagement patterns by:

- Analyzing audience emotions through facial expression detection.

- Identifying featured products in your content for partnership opportunities.

- Tracking brand logos in your images to measure sponsorship reach.

## Setup Guide for Running SmartLens AI 2.0 Locally

This guide explains how to set up and run the SmartLens AI 2.0 application on your local machine.

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or above)

- npm (comes with Node.js)
  
- Git

- Google Cloud Service Account Key (for Vision API integration)

## 1. Clone the Repository

Clone the repository:

 ```bash
  git clone
 ```

## 2. Set Up Backend

1. Navigate to the backend folder and Install dependencies:
   
 ```bash
cd backend
npm install
 ```

2. Create a .env file in the backend folder and add the following:

 ```bash
PINTEREST_CLIENT_ID=<your-client-id>
PINTEREST_CLIENT_SECRET=<your-client-secret>
REDIRECT_URI=http://localhost:5000/auth/callback
GOOGLE_CLOUD_PROJECT=<your-google-cloud-project-id>
GOOGLE_APPLICATION_CREDENTIALS=./project2-443005-1e2f5698211a.json
 ```
3. Place the Google Cloud Service Account Key (.json file) in the backend folder.
   
4. Start the backend server:
 
 ```bash
  npm start
 ```

The backend will run on http://localhost:5000.

## 3. Set Up Frontend

1. Navigate to the backend folder and Install dependencies:
   
 ```bash
cd ../frontend
npm install
 ```
2. Update the API base URL in frontend/src/config.js (or similar configuration file):
   
```bash
export const API_BASE_URL = "http://localhost:5000"; // Use your backend's local URL
 ```
3. Start the frontend development server:
 
 ```bash
  npm start
 ```
The frontend will run on http://localhost:3000.

## 4. Running the Application

1. Open your browser and navigate to http://localhost:3000.
2. Log in with Pinterest using the provided login button.
3. After logging in, you’ll be redirected to the dashboard.

## 5. Troubleshooting

Error: Access Token Expired

•	Ensure the backend handles token refresh correctly by including the refresh token logic.

CORS Issues

•	If you encounter CORS errors, ensure your backend index.js includes:

 ```bash
const cors = require("cors");
app.use(cors({ origin: "*" }));
 ```

Google Cloud Issues
Ensure you’ve enabled the Vision API in your Google Cloud Project:
- Go to the Google Cloud Console.
- Enable the Vision API.

