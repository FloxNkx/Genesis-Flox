import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// Function to connect to MongoDB
const connectToMongoDB = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Mongodb connected");
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }).catch((err) => {
    console.log("Failed to connect to MongoDB. Retrying in 5 seconds...");
    setTimeout(connectToMongoDB, 5000);
  });
};

// Connect to MongoDB
connectToMongoDB();

// Event listeners for MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});;

app.set("view engine", "ejs");
app.use("/api/v1", routes)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

export default app;
