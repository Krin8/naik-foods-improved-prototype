import { PrismaClient } from "@prisma/client";
import { products } from "../data/products.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Delete existing records to avoid duplicates on re-runs
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.referral.deleteMany({});

  const referralCodes = [
    { code: "FRIEND100", discountAmt: 100 },
    { code: "WELCOME100", discountAmt: 100 },
    { code: "PUNE50", discountAmt: 50 }
  ];

  for (const ref of referralCodes) {
    await prisma.referral.create({
      data: {
        code: ref.code,
        discountAmt: ref.discountAmt,
        referrerId: "system"
      }
    });
    console.log(`Created referral code: ${ref.code} (₹${ref.discountAmt} off)`);
  }

  for (const product of products) {
    const dbProduct = await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        description: product.description,
        shortDesc: product.shortDesc || "",
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount || 0,
        weight: product.weight,
        category: product.category,
        region: product.region,
        image: product.image,
        images: JSON.stringify(product.images || []),
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        tags: JSON.stringify(product.tags || []),
        highlights: JSON.stringify(product.highlights || []),
        variants: JSON.stringify(product.variants || []),
        fssai: product.fssai || "",
        ingredients: product.ingredients || "",
        nutrition: product.nutrition || "",
        allergens: product.allergens || "",
        shelfLife: product.shelfLife || "",
        isVegetarian: product.isVegetarian !== false,
        inStock: product.inStock !== false,
        isNew: product.isNew || false,
        isBestseller: product.isBestseller || false,
      },
    });
    console.log(`Created product: ${dbProduct.name} (rating: ${dbProduct.rating}, reviews: ${dbProduct.reviews}, discount: ${dbProduct.discount}%)`);
  }

  console.log(`\nSeeded ${products.length} products successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
