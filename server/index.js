import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (req.method === 'OPTIONS') {
    return res.status(200).json(({ body: 'OK' }));
  }

  return next();
})

app.set("view engine", "ejs");
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Mongodb connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});

export default app