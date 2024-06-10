// src/services/favoriteService.ts
import FavoriteProductModel from "../models/favoriteModel";

export const getFavoriteProducts = async (customer_id: string) => {
  return await FavoriteProductModel.find({ customer_id });
};

export const addFavoriteProduct = async (
  product_id: string,
  customer_id: string
) => {
  const newFavoriteProduct = new FavoriteProductModel({
    product_id,
    customer_id,
  });
  return await newFavoriteProduct.save();
};

export const deleteFavoriteProduct = async (
  product_id: string,
  customer_id: string
) => {
  return await FavoriteProductModel.deleteOne({ product_id, customer_id });
};
