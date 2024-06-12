// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 80;
import favoriteProducts from "./routes/favorites";

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
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
