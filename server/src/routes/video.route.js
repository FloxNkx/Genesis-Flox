import express from "express";
import videoController from "../controllers/video.controller.js";

import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file)
    const originalname = file.originalname;
    const extension = originalname.split(".");
    filename = Date.now() + "." + extension[extension.length - 1];
    cb(null, filename);
  },
});

router.get(
  "/video",
  multer({ storage: storage, dest: "./uploads/" }).single("uploads"),
  videoController.getVideo
);

router.post(
  "/video",
  multer({ storage: storage, dest: "./uploads/" }).single("uploads"),
  videoController.addVideo
);

export default router;
