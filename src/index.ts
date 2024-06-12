// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 80;
import favoriteProducts from "./routes/favorites";

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

const MONGO_URL = `mongodb+srv://good-american:good-american@cluster0.wtbnylp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connected.");
});

app.use("/favorites", favoriteProducts);
