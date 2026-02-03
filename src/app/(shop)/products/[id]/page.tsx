import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailsPageClient from "@/src/components/pages/ProductDetailsPageClient";
import { buildMetadata } from "@/src/lib/seo";
import { getProductById } from "@/src/lib/server/products";

type ProductParams = {
  id: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<ProductParams>;
}): Promise<Metadata> {
  
  const { id } = await params;
  const parsedId = Number(id);

  if (!Number.isFinite(parsedId)) {
    return buildMetadata({
      title: "Produto nao encontrado",
      description: "O produto solicitado nao foi encontrado.",
      path: `/products/${id}`,
      noIndex: true,
    });

  }

  const product = getProductById(parsedId);

  if (!product) {
    return buildMetadata({
      title: "Produto nao encontrado",
      description: "O produto solicitado nao foi encontrado.",
      path: `/products/${parsedId}`,
      noIndex: true,
    });

  }

  return buildMetadata({
    title: `${product.name} | Produto`,
    description: product.description.slice(0, 155),
    path: `/products/${product.id}`,
    image: product.image,
  });

}

export default async function ProductPage({
  params,
}: {
  params: Promise<ProductParams>;
}) {

  const { id } = await params;
  const parsedId = Number(id);

  if (!Number.isFinite(parsedId)) {
    notFound();
  }

  const product = getProductById(parsedId);

  if (!product) {
    notFound();
  }

  return <ProductDetailsPageClient product={product} />;
}
