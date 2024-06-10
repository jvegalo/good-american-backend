const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
import favoriteRouter from "../src/routes/favorites";
import FavoriteProductModel from "../src/models/favoriteModel";

const app = express();
app.use(bodyParser.json());
app.use("/favorites", favoriteRouter);

// Connect to the database before each test
beforeEach(async () => {
  await mongoose.connect(
    "mongodb+srv://good-american:good-american@cluster0.wtbnylp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
});

// Close the database connection after each test
afterEach(async () => {
  await mongoose.connection.close();
});

describe("Favorite Products API", () => {
  it("should retrieve favorite products for a customer", async () => {
    const mockFavorite = new FavoriteProductModel({
      product_id: "123",
      customer_id: "abc",
    });
    await mockFavorite.save();

    const response = await request(app).get("/favorites/abc");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ product_id: "123", customer_id: "abc" }),
      ])
    );

    await FavoriteProductModel.deleteOne({
      product_id: "123",
      customer_id: "abc",
    });
  });

  it("should add a new favorite product", async () => {
    const mockFavorite = { product_id: "123", customer_id: "abc" };

    const response = await request(app).post("/favorites").send(mockFavorite);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });

    await FavoriteProductModel.deleteOne({
      product_id: "123",
      customer_id: "abc",
    });
  });

  it("should delete a favorite product", async () => {
    const mockFavorite = new FavoriteProductModel({
      product_id: "123",
      customer_id: "abc",
    });
    await mockFavorite.save();

    const response = await request(app)
      .delete("/favorites")
      .send({ product_id: "123", customer_id: "abc" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });
});
