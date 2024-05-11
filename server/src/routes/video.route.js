import express from "express";
import videoController from "../controllers/video.controller.js";
import telegramController from "../controllers/telegram.controller.js"
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();

let connection = mongoose.connection;

connection.on("open", () => {
  console.log("connection established successfully");
  let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  router.get("/video/:fileId", upload.single("file"), (req, res) =>
    videoController.getVideo(req, res, bucket)
  );

  router.post("/video", upload.single("file"), (req, res) =>
    videoController.addVideo(req, res, bucket)
  );

  router.get("/videoList", upload.single("file"), async (req, res) => {
    const videos = await videoController.getLastVideo(req, res, bucket)
    if(!videos.length) {
      res.status(404).json({ text: 'No video' })
    } else {
      res.status(201).json({ message: JSON.stringify(videos) })
    }
  });

  router.get("/sendMessage", upload.single("file"), (req, res) =>
    telegramController.sendMessage(req, res, bucket)
  );
});

export default router;
