import express from "express";
import videoRoute from "./video.route.js";

const router = express.Router();

router.use("/main", videoRoute);
router.get('/', function(req, res) {
    res.send('Birds home page');
});
export default router;