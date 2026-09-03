import { notFound } from "next/navigation";
import ProductClientView from "./ProductClientView";
import { PRODUCTS } from "@/src/data/product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Find product matching URL slug
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductClientView product={product} />;
}