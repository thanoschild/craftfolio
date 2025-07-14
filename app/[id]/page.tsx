import PublicPortfolioPage from '@/components/user-portfolio/preview/PublicPortfolioPage'
import React from 'react'

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PortfolioPage({ params }: Props) {
  const { id } = await params;
  
  return (
    <PublicPortfolioPage id={id} />
  )
}