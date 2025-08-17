import { notFound } from "next/navigation";
import { getProductById, Product } from "@/lib/getProduct";
import ProductDetail from "../../components/ProductDetail";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params);
  const product = await getProductById(id);

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}