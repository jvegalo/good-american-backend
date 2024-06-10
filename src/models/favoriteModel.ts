import mongoose from "mongoose";

const FavoriteProductSchema = new mongoose.Schema({
  product_id: String,
  customer_id: String,
});

const FavoriteProductModel = mongoose.model(
  "FavoriteProduct",
  FavoriteProductSchema
);

export default FavoriteProductModel;
