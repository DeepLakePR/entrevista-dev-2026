import type { Metadata } from "next";

import ShopHomePage from "@/src/components/pages/ShopHomePage";
import { buildMetadata } from "@/src/lib/seo";

type HomeSearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<HomeSearchParams>;
}): Promise<Metadata> {
  
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams.category;
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

  if (category) {

    return buildMetadata({
      title: `Produtos de ${category}`,
      description: `Veja produtos da categoria ${category} na Uncode Commerce.`,
      path: `/?category=${encodeURIComponent(category)}`,
    });

  }

  return buildMetadata({
    title: "Catálogo de produtos",
    description: "Explore produtos para devs com filtros por categoria, busca e ordenacao.",
    path: "/",
  });
}

export default function Page() {
  return <ShopHomePage />;
}
