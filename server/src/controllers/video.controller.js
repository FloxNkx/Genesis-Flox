import responseHandler from "../handlers/response.handler.js";
import videoModel from "../models/video.model.js";

const addVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided in the request' });
    }

    const video = new videoModel({
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination:req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    });

    await video.save();

    res.status(201).json({ message: 'Video uploaded successfully'});
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Error uploading video' });
  }
};

const getVideo = async (req, res) => {
  try {
    const videos = await videoModel.find({ user: req.user.id }).sort("-createdAt");
    responseHandler.ok(res, videos);
  } catch (error) {
    console.error('Error retrieving videos:', error);
    responseHandler.error(res);
  }
};

export default { addVideo, getVideo };
