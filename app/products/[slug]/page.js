import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({ where: { slug: resolvedParams.slug } });
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} by ${product.brand} | Naik Foods`,
    description: product.description,
    openGraph: {
      title: `${product.name} — ₹${product.price}`,
      description: product.description,
      images: [product.image],
      url: `https://naik-foods-improved-demo.surge.sh/products/${product.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} by ${product.brand}`,
      description: product.description,
      images: [product.image],
    },
  };
}
export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const rawProduct = await prisma.product.findUnique({ where: { slug } });

  if (!rawProduct) return notFound();

  // Parse JSON string fields back into arrays for the client component
  const product = {
    ...rawProduct,
    images: JSON.parse(rawProduct.images || "[]"),
    tags: JSON.parse(rawProduct.tags || "[]"),
    highlights: JSON.parse(rawProduct.highlights || "[]"),
    variants: JSON.parse(rawProduct.variants || "[]"),
  };

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://naik-foods-improved-demo.surge.sh/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://naik-foods-improved-demo.surge.sh"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Store",
      "item": "https://naik-foods-improved-demo.surge.sh/store"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": product.name
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
