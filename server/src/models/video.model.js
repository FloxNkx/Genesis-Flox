import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Video",
  mongoose.Schema({
    title: {
      type: String
    },
    video: {
      type: String,
      required: true
    },
  }, modelOptions)
);