import { notFound } from "next/navigation";
import ProductClientView from "./ProductClientView";
import { PRODUCTS } from "@/src/data/product";

// 1. Fetch the right product dynamically based on the URL slug
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Search the array for a matching slug
  const product = PRODUCTS.find((p) => p.slug === slug);

  // If the product doesn't exist, show Next.js 404 page
  if (!product) {
    notFound();
  }

  // Pass the found product into the UI
  return <ProductClientView product={product} />;
}