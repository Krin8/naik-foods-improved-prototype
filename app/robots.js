export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://naik-foods-improved-demo.surge.sh/sitemap.xml',
  }
}
