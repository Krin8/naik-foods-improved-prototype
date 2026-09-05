import { products } from "@/data/products";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://naik-foods-improved-demo.surge.sh";

  const routes = ["", "/store", "/about", "/contact", "/policies"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...routes,
    ...productUrls,
  ];
}
