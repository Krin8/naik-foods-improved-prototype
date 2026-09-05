import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import StoreClient from "./StoreClient";

const prisma = new PrismaClient();

export default async function StorePage() {
  const products = await prisma.product.findMany();
  
  return (
    <Suspense fallback={<div className="container" style={{ padding: "4rem 0" }}>Loading store...</div>}>
      <StoreClient initialProducts={products} />
    </Suspense>
  );
}
