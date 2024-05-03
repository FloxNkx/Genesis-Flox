import express from "express";
import videoController from "../controllers/video.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get(
  "/video",
  tokenMiddleware.auth,
  videoController.getVideo
);

router.post(
  "/video",
  upload.single('video'),
  videoController.addVideo
);

export default router;