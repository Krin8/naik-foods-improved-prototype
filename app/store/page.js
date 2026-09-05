import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import StoreClient from "./StoreClient";

const prisma = new PrismaClient();

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
