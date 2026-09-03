import { notFound } from "next/navigation";
import ProductClientView from "./ProductClientView";
import { fetchProductBySlug, fetchProducts } from "@/src/lib/product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch product from MongoDB Atlas via API
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products from DB
  const allProducts = await fetchProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== slug).slice(0, 3);

  return <ProductClientView product={product} initialRelatedProducts={relatedProducts} />;
}