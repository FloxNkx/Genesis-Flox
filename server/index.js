import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
import cors from 'cors';

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Mongodb connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://genesis-lovat.vercel.app');
  res.header('Access-Control-Allow-Methods', "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.header('Access-Control-Allow-Headers', "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
  res.status(200).end();
  return;
  };
  next();
});

app.set("view engine", "ejs");
app.use("/", (req, res) => res.send('Hewllo'));
app.use("/api/v1", routes)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 5000;

const server = http.createServer(app);

export default app