const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const fs = require("fs");

const app = express();
const port = 3000;

const pool = new Pool({
    user: "genesis",
    host: "dpg-coogcgev3ddc738nsmlg-a",
    database: "genesis_w6n8e",
    password: "MiiWg2l9zLD4D4fWCsWBNtNpR4F4Qs24",
    port: 5432,
});

// Configure multer to handle file uploads
const upload = multer({ dest: "uploads/" });

// Endpoint to handle video upload
app.post("/upload", upload.single("video"), async (req, res) => {
    try {
        // Save video file to database or disk
        const videoData = fs.readFileSync(req.file.path);
        // Store videoData in the database as binary data or save the file path
        // Example query to insert file path into database:
        await pool.query("INSERT INTO videos (file_path) VALUES ($1)", [
            req.file.path,
        ]);

        res.status(200).send("Video uploaded successfully.");
    } catch (err) {
        console.error("Error uploading video:", err);
        res.status(500).send("Error uploading video.");
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
