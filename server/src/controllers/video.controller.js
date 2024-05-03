import responseHandler from "../handlers/response.handler.js";
import videoModel from "../models/video.model.js";
import cloudinary from 'cloudinary'

const addVideo = async (req, res) => {
  try {
    console.log(req.body.video)
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No file provided in the request' });
    }

    await cloudinary.v2.uploader.upload_stream({ resource_type: 'video' }, async (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ error: 'Error uploading to Cloudinary' });
      }
      const video = new videoModel({
        title: req.body.title || 'Untitled Video',
        video: result.secure_url,
      });

      await video.save();

      res.status(201).json({ message: 'Video uploaded successfully'});
    }).end(req.file.buffer);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Error uploading video' });
  }
};

const getVideo = async (req, res) => {
  try {
    const video = await video.find({ user: req.user.id }).sort("-createdAt");

    responseHandler.ok(res, video);
  } catch {
    responseHandler.error(res);
  }
};

export default { addVideo, getVideo };
