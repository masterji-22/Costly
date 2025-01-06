const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require("child_process"); // Changed from PythonShell to spawn
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { promisify } = require("util");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" folder (or your frontend folder)
app.use(express.static(path.join(__dirname, "public")));
// Serve static files (like images) from the 'images' directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Handle any other requests (e.g., routes for API calls)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

// Function to process the Python recommendation
async function processRecommendation(savePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["main.py", savePath]);

    let data = ""; // Initialize variable to collect Python output

    pythonProcess.stdout.on("data", (chunk) => {
      data += chunk; // Accumulate data as it's received
    });

    pythonProcess.stderr.on("data", (err) => {
      console.error(`stderr: ${err.toString()}`);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const recommendedProducts = JSON.parse(data); // Parse the response from the Python script
          resolve(recommendedProducts);
        } catch (error) {
          reject(new Error("Failed to parse Python response"));
        }
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });
}

// API route to handle product recommendations
app.post("/recommend", async (req, res) => {
  console.log("Received a request for recommendations...");
  const uploadedFileUrl = req.body.uploadedFileUrl;
  console.log(`Processing image URL: ${uploadedFileUrl}`);

  // Assuming the image URL points to the asset folder, we get the file name
  const imagePath = path.join(
    __dirname,
    "public",
    "assets",
    uploadedFileUrl.split("/").pop()
  );

  try {
    const recommendedProducts = await processRecommendation(imagePath);
    res.json({
      message: "Recommendation successful",
      recommendedProducts,
    });
  } catch (error) {
    console.error("Recommendation failed:", error.message);
    res.status(500).json({
      message: "Failed to generate recommendations",
      error: error.message,
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
