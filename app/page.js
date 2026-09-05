import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";


export default async function HomePage() {
  const rawProducts = await prisma.product.findMany();
  const products = rawProducts.map(p => ({
    ...p,
    tags: JSON.parse(p.tags || "[]"),
    variants: JSON.parse(p.variants || "[]"),
  }));
  
  return <HomeClient products={products} />;
}
