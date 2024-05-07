import express from "express";
import videoController from "../controllers/video.controller.js";
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();

let connection = mongoose.connection;

router.get('/ver', function (req, res, next) {
  res.send('POST request to the homepage')
  res.end();
})

connection.on("open", () => {
  console.log("connection established successfully");
  let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  router.get('/veri', function (req, res, next) {
    res.send('POST request to the homepage')
    res.end();
  })
  
  router.get("/video/:fileId", upload.single("file"), (req, res) =>
    videoController.getVideo(req, res, bucket)
  );

  router.post("/video", upload.single("file"), (req, res) =>
    videoController.addVideo(req, res, bucket)
  );
});

export default router;
