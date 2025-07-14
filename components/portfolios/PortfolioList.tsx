import React from 'react';
import Link from 'next/link';
import { Portfolio } from './PortfoliosPage';

type Props = {
  portfolios: Portfolio[];
};

export default function PortfolioList({ portfolios }: Props) {
  return (
    <div className="space-y-3">
      {portfolios.map((portfolio) => (
        <PortfolioListItem
          key={portfolio.id}
          portfolio={portfolio}
        />
      ))}
    </div>
  );
}

function PortfolioListItem({ 
  portfolio
}: { 
  portfolio: Portfolio;
}) {
  return (
    <div className="bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-xl p-4 hover:border-light-text dark:hover:border-dark-text transition-all duration-300">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-light-text/10 to-light-text-sub/10 dark:from-dark-text/10 dark:to-dark-text-sub/10 rounded-xl flex items-center justify-center font-bold text-light-text dark:text-dark-text border border-light-border-sub dark:border-dark-border-sub">
            {portfolio.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-light-text dark:text-dark-text truncate">
              {portfolio.name}
            </div>
          </div>
        </div>
        <Link
          href={`/${portfolio.id}`}
          className="flex items-center gap-2 px-3 py-2 bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg rounded-lg hover:bg-light-text-sub dark:hover:bg-dark-text-sub transition-colors font-medium text-sm whitespace-nowrap"
        >
          View
        </Link>
      </div>
    </div>
  );
}