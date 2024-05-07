import express from "express";
import videoController from "../controllers/video.controller.js";
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/video/:fileId", upload.single("file"), (req, res) => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
  videoController.getVideo(req, res, bucket);
});

router.post("/video", upload.single("file"), (req, res) => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
  videoController.addVideo(req, res, bucket);
});

export default router;
