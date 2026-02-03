import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://entrevista-dev-2026.vercel.app";

export const siteConfig = {
  name: "Uncode Commerce",
  shortName: "Uncode",
  locale: "pt_BR",
  description: "Loja online com produtos para devs, com busca, filtros e favoritos.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL,
};

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/logo.png",
  noIndex = false,
}: BuildMetadataOptions): Metadata {

  const canonical = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: { index: !noIndex, follow: !noIndex },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
