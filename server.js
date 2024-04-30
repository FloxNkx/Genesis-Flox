const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Handle POST request to /upload
app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    console.log('File uploaded:', req.file.filename);
    res.status(200).send('File uploaded');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});