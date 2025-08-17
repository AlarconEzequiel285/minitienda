// lib/getProduct.ts
import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

export async function getProductById(id: string) {
  const client = await clientPromise;
  const db = client.db("watersugar");

  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id) });

  if (!product) return null;

  // Convertir a plain object
  return {
    _id: product._id.toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    imageUrl: product.imageUrl,
  };
}
