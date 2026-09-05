import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import ProductDetailClient from "./ProductDetailClient";

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) return notFound();

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
