import { PrismaClient } from "@prisma/client";
import { products } from "../data/products.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Delete existing records to avoid duplicates on re-runs
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});

  for (const product of products) {
    const dbProduct = await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        weight: product.weight,
        category: product.category,
        region: product.region,
        image: product.image,
        inStock: product.inStock,
        isNew: product.isNew,
        isBestseller: product.isBestseller,
      },
    });
    console.log(`Created product: ${dbProduct.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
