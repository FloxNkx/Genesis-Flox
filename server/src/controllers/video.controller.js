import { Readable } from "stream";
import VideoModel from "../models/video.model.js";
import { ObjectId } from 'mongodb';

const addVideo = async (req, res, bucket) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided in the request" });
    }

    let { file } = req
    let { fieldname, originalname, mimetype, buffer } = file

    let newFile = new VideoModel({
      filename: `File ${new Date().getMilliseconds()}.mp4`,
      contentType: mimetype,
      length: buffer.length,
    });

    let uploadStream = bucket.openUploadStream(fieldname)
    let readBuffer = new Readable()
    readBuffer.push(buffer)
    readBuffer.push(null)

    await new Promise((resolve, reject) => {
      readBuffer
        .pipe(uploadStream)
        .on("finish", resolve("successfull"))
        .on("error", reject("error occured while creating stream"))
    });

    newFile.fileId = uploadStream.id;

    let savedFile = await newFile.save()
    if (!savedFile) {
      return res.status(404).send("error occured while saving our work")
    }

    res.status(201).json({ message: "Video uploaded successfully" })
  } catch (error) {
    console.error("Error uploading video:", error)
    res.status(500).json({ error: "Error uploading video" })
  }
};

const getVideo = async (req, res, bucket) => {
  try {
    let { fileId } = req.params;

    if (!fileId) {
      res.status(500).json({ error: "No file id" });
      return;
    }

    let downloadStream = bucket.openDownloadStream(new ObjectId(fileId));

    if (!downloadStream) {
      res.status(500).json({ error: "No file downlaod stream" });
      return;
    }

    downloadStream.on("file", (file) => {
      let objectDate = new Date(file.uploadDate);

      let day = objectDate.getDate();
      let month = objectDate.getMonth();
      let hour = objectDate.getHours();
      let minutes = objectDate.getMinutes();

      res.set("Content-Type", file.contentType);
      res.attachment(`Month(${month}).Day(${day}).Time(${hour},${minutes}).mp4`)
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving videos:", error);
  } finally {
    console.log(2)
  }
};

const getLastVideo = async (req, res, bucket) => {
  try {
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
    const lastVideo = await VideoModel.find({
      createdAt: {
          $gte: twelveHoursAgo,
          $lte: new Date()
      }
    })
    
    return lastVideo
  } catch (error) {
    res.status(500).json({ error: error })
  }
};

export default { addVideo, getVideo, getLastVideo };
