import responseHandler from "../handlers/response.handler.js";
import videoModel from "../models/video.model.js";
import multer from 'multer';

// Configure multer for handling file uploads
const upload = multer({ dest: 'videos/' }); // Adjust the destination directory as needed

const addVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided in the request' });
    }

    const video = new videoModel({
      title: req.body.title || 'Untitled Video',
      video: req.file.path, // Assuming req.file contains the uploaded video file
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
