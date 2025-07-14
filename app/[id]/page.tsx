import PublicPortfolioPage from "@/components/user-portfolio/preview/PublicPortfolioPage";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/portfolio/public/${id}`, {
      next: { revalidate: 86400 }, // Cache for 24 hour
    });

    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    return {
      title: `${data.name || id} | Craftfolio`,
      description:
        data.about || `${data.name || id} - Professional developer portfolio`,
      openGraph: {
        title: data.name || id,
        description: data.about || "Professional developer portfolio",
        images: data.image_url ? [data.image_url] : undefined,
      },
    };
  } catch {
    return {
      title: `${id} | Craftfolio`,
      description: "Professional developer portfolio",
    };
  }
}

export default async function PortfolioPage({ params }: Props) {
  const { id } = await params;

  return <PublicPortfolioPage id={id} />;
}
