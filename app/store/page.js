import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import StoreClient from "./StoreClient";


export default async function StorePage() {
  const rawProducts = await prisma.product.findMany();
  const products = rawProducts.map(p => ({
    ...p,
    tags: JSON.parse(p.tags || "[]"),
    variants: JSON.parse(p.variants || "[]"),
  }));
  
  return (
    <Suspense fallback={<div className="container" style={{ padding: "4rem 0" }}>Loading store...</div>}>
      <StoreClient initialProducts={products} />
    </Suspense>
  );
}
