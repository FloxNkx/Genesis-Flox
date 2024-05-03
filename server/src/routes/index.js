import express from "express";
import videoRoute from "./video.route.js";

const router = express.Router();

router.use("/main", videoRoute);

export default router;