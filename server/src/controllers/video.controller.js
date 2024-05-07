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
      filename: `File ${new Date().getMilliseconds()}`,
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

    newFile.id = uploadStream.id;

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
      res.set("Content-Type", file.contentType);
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving videos:", error);
  } finally {
    console.log(2)
  }
};

export default { addVideo, getVideo };
