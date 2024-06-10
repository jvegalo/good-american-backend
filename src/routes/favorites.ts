import express from "express";
import {
  getFavoriteProducts,
  addFavoriteProduct,
  deleteFavoriteProduct,
} from "../services/favoritesService";

const router = express.Router();

router.get("/:customer_id", async (req, res) => {
  const { customer_id } = req.params;
  try {
    const favoriteProducts = await getFavoriteProducts(customer_id);
    res.status(200).json(favoriteProducts);
  } catch (error) {
    console.error("Error retrieving favorite products:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve favorite products" });
  }
});

router.post("/", async (req, res) => {
  const { product_id, customer_id } = req.body;
  try {
    await addFavoriteProduct(product_id, customer_id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving favorite product:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to save favorite product" });
  }
});

router.delete("/", async (req, res) => {
  const { product_id, customer_id } = req.body;
  try {
    const result = await deleteFavoriteProduct(product_id, customer_id);
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

export default router;
