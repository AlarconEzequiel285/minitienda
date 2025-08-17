import { notFound } from "next/navigation";
import { getProductById, Product } from "@/lib/getProduct";
import ProductDetail from "../../components/ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>; // Next.js espera params como Promise en rutas dinámicas
}

export default async function ProductPage({ params }: PageProps) {
  // Resolvemos la Promise para obtener el id
  const { id } = await params;

  // Obtenemos el producto
  const product = await getProductById(id);

  // Si no existe, devolvemos 404
  if (!product) return notFound();

  // Renderizamos el detalle
  return <ProductDetail product={product} />;
}
