import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./Routes/AuthRoute.js";
import cookieParser from "cookie-parser";
dotenv.config();
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connect to db successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/", authRouter);

app.get("/home", (req, res) => {
  res.set({
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  res.json({
    name: "Shreyash",
    age: 18,
  });
});

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
