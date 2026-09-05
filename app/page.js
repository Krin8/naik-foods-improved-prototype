import { PrismaClient } from "@prisma/client";
import HomeClient from "./HomeClient";

const prisma = new PrismaClient();

export default async function HomePage() {
  const products = await prisma.product.findMany();
  
  return <HomeClient products={products} />;
}
