import { PrismaClient } from "@prisma/client";
import HomeClient from "./HomeClient";

const prisma = new PrismaClient();

export default async function HomePage() {
  const rawProducts = await prisma.product.findMany();
  const products = rawProducts.map(p => ({
    ...p,
    tags: JSON.parse(p.tags || "[]"),
    variants: JSON.parse(p.variants || "[]"),
  }));
  
  return <HomeClient products={products} />;
}
