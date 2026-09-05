import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }) {
  const { slug } = params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
