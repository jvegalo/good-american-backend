import express from "express";
const router = express.Router();
import mongoose from "mongoose";

const FavoriteProductSchema = new mongoose.Schema({
  product_id: String,
  customer_id: String,
});
var FavoriteProductModel = mongoose.model(
  "FavoriteProductSchema",
  FavoriteProductSchema
);

router.get("/:customer_id", async function (req, res) {
  const { customer_id } = req.params;
  try {
    const favoriteProducts = await FavoriteProductModel.find({
      customer_id,
    });
    res.status(200).json(favoriteProducts);
  } catch (error) {
    console.error("Error retrieving favorite products:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve favorite products" });
  }
});

router.post("/", async function (req, res) {
  const { product_id, customer_id } = req.body;

  const newFavoriteProduct = new FavoriteProductModel({
    product_id,
    customer_id,
  });

  try {
    await newFavoriteProduct.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving favorite product:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to save favorite product" });
  }
});

router.delete("/", async function (req, res) {
  const { product_id, customer_id } = req.body;
  console.log(product_id, customer_id);

  try {
    const result = await FavoriteProductModel.deleteOne({
      product_id,
      customer_id,
    });
    if (result.deletedCount === 0) {
      res
        .status(404)
        .json({ success: false, error: "No favorite product found to delete" });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Error deleting favorite product:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete favorite product" });
  }
});

module.exports = router;
