import React, { useState } from 'react';
import Link from 'next/link';
import { LuCalendar, LuCopy, LuCheck } from 'react-icons/lu';
import { Portfolio } from './PortfoliosPage';
import { showToast } from '../ui/Toast';

type Props = {
  portfolios: Portfolio[];
};

export default function PortfolioTable({ portfolios }: Props) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-light-border-sub dark:border-dark-border-sub">
              <th className="text-left py-4 px-6 text-sm font-semibold text-light-text dark:text-dark-text">
                Name
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-light-text dark:text-dark-text">
                Portfolio ID
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-light-text dark:text-dark-text">
                Created
              </th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-light-text dark:text-dark-text">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio, index) => (
              <PortfolioTableRow
                key={portfolio.id}
                portfolio={portfolio}
                formatDate={formatDate}
                isLast={index === portfolios.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PortfolioTableRow({ 
  portfolio, 
  formatDate,
  isLast
}: { 
  portfolio: Portfolio; 
  formatDate: (timestamp: number) => string;
  isLast: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyPortfolioLink = async () => {
    const portfolioUrl = `${window.location.origin}/${portfolio.id}`;
    
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error('Failed to copy link:', err);
      showToast.error("Failed to copy link");
    }
  };

  return (
    <tr className={`hover:bg-light-bg dark:hover:bg-dark-bg transition-colors ${!isLast ? 'border-b border-light-border-sub dark:border-dark-border-sub' : ''}`}>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-light-text/10 to-light-text-sub/10 dark:from-dark-text/10 dark:to-dark-text-sub/10 rounded-xl flex items-center justify-center font-bold text-sm text-light-text dark:text-dark-text border border-light-border-sub dark:border-dark-border-sub">
            {portfolio.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-light-text dark:text-dark-text">
              {portfolio.name}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <code className="text-sm text-light-text-sub dark:text-dark-text-sub bg-light-bg dark:bg-dark-bg px-2 py-1 rounded-md">
          {portfolio.id}
        </code>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 text-sm text-light-text-sub dark:text-dark-text-sub">
          <LuCalendar className="w-4 h-4" />
          <span>{formatDate(portfolio.timestamp)}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/${portfolio.id}`}
            className="inline-flex items-center gap-2 px-4 py-1 bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg rounded-lg hover:bg-light-text-sub dark:hover:bg-dark-text-sub transition-colors font-medium text-sm"
          >
            View
          </Link>
          <button
            onClick={copyPortfolioLink}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium text-sm ${
              copied
                ? 'dark:bg-green-900/20 text-green-600 dark:text-green-400'
                : 'text-light-text-sub dark:text-dark-text-sub hover:border-light-text dark:hover:border-dark-text hover:text-light-text dark:hover:text-dark-text'
            }`}
            title="Copy portfolio link"
          >
            {copied ? (
              <>
                <LuCheck className="w-4 h-4" />
              </>
            ) : (
              <>
                <LuCopy className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}