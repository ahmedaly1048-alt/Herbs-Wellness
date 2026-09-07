import { notFound } from "next/navigation";
import ProductClientView from "./ProductClientView";
import { fetchProductBySlug } from "@/src/lib/api";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch product from the Express backend (falls back to the static catalog
  // if the API is unreachable).
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductClientView product={product} />;
}