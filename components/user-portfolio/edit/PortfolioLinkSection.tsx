"use client";

import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";
import Button from "@/components/ui/Button";

type PortfolioLinkSectionProps = {
  portfolioUrl: string;
  isLive: boolean;
  onEditClick: () => void;
  onToggleLive: () => void;
  onVisitSite: () => void;
};

export default function PortfolioLinkSection({
  portfolioUrl,
  isLive,
  onEditClick,
  onToggleLive,
  onVisitSite,
}: PortfolioLinkSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 py-4 sm:py-6 bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-lg px-4 sm:px-6">
      {/* URL Section */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {/* Domain prefix */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <AiOutlineLink className="text-lg text-light-text dark:text-dark-text" />
          <span className="text-sm font-medium text-light-text dark:text-dark-text whitespace-nowrap">
            craftfolio.space/
          </span>
        </div>

        {/* URL Input */}
        <div className="flex-1 relative min-w-0">
          <input
            type="text"
            value={portfolioUrl}
            placeholder="your-portfolio-name"
            className="w-full px-3 sm:px-4 py-2 text-sm font-medium text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg cursor-pointer hover:border-light-text dark:hover:border-dark-text transition-colors duration-200"
            readOnly
            onClick={onEditClick}
          />
          <button
            onClick={onEditClick}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-light-text-sub dark:text-dark-text-sub hover:text-light-text dark:hover:text-dark-text transition-colors duration-200"
          >
            <MdOutlineEdit className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Live Status */}
        {isLive && (
          <Button
          variant="plain"
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            LIVE
          </span>
        </Button>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isLive ? (
            <>
              <Button 
                variant="secondary" 
                onClick={onToggleLive}
                className="text-xs sm:text-sm px-3 sm:px-4 py-2"
              >
                Unpublish
              </Button>
              <Button
                variant="primary"
                onClick={onVisitSite}
                className="text-xs sm:text-sm px-3 sm:px-4 py-2"
              >
                Visit Site
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={onToggleLive}
              icon={<FiUploadCloud className="w-4 h-4" />}
              className="text-xs sm:text-sm px-3 sm:px-4 py-2"
            >
              Publish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}