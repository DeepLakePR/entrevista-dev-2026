import type { MetadataRoute } from "next";

import products from "@/src/lib/server/products";
import { siteConfig } from "@/src/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const basePages: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/favorites`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...basePages, ...productPages];
}
