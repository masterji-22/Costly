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

  // Download the image and save it as temp_image.jpg
  try {
    const response = await axios({
      url: uploadedFileUrl,
      method: "GET",
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: "https://images.undiz.com/",
      },
    });

    // Save the image locally as temp_image.jpg
    const savePath = path.join(__dirname, "temp_image.jpg");
    const writeFile = promisify(fs.writeFile);
    await writeFile(savePath, response.data);
    console.log("Image saved as temp_image.jpg");

    const MAX_RETRIES = 3;
    let retries = 0;

    const retryRecommendation = async () => {
      try {
        const recommendedProducts = await processRecommendation(savePath);
        res.json({
          message: "Recommendation successful",
          recommendedProducts,
        });
      } catch (error) {
        retries++;
        console.error(`Attempt ${retries} failed: ${error.message}`);
        if (retries < MAX_RETRIES) {
          console.log("Retrying recommendation...");
          retryRecommendation(); // Retry the recommendation
        } else {
          console.log("Max retries reached. Restarting server...");
          process.exit(1); // Exit to allow external process manager to restart the server
        }
      }
    };

    retryRecommendation(); // Start the recommendation process
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Failed to download image" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
