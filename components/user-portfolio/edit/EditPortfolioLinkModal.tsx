'use client';

import React, { useState } from "react";
import Button from "../../ui/Button";
import { isValidSlug } from "@/lib/utils";
import { IoClose } from "react-icons/io5";
import { showToast } from "@/components/ui/Toast";

type EditPortfolioLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentLink: string;
  onSave: (newLink: string) => void;
};

export default function EditPortfolioLinkModal({
  isOpen,
  onClose,
  currentLink,
  onSave,
}: EditPortfolioLinkModalProps) {
  const [editLink, setEditLink] = useState(currentLink);
  const [linkError, setLinkError] = useState("");
  const [isCheckingLink, setIsCheckingLink] = useState(false);

  const handleSaveLink = async () => {
    const trimmedLink = editLink.trim();
    
    // Reset error
    setLinkError("");
    
    // Validate slug format
    if (!isValidSlug(trimmedLink)) {
      setLinkError("Link must contain only lowercase letters, numbers, and hyphens");
      return;
    }
    
    // Check if link is available (skip if it's the same as current)
    if (trimmedLink !== currentLink) {
      setIsCheckingLink(true);

      
      try {
        const response = await fetch("/api/portfolio/check-id", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: trimmedLink }),
        });
        
        const data = await response.json();
        
        if (!data.available) {
          setLinkError("This link is already taken. Please choose another one.");
          showToast.error("Link unavailable", "This link is already taken. Please choose another one.");
          setIsCheckingLink(false);
          return;
        }
      } catch (error) {
        console.error("Error checking link availability:", error);
        setLinkError("Error checking link availability. Please try again.");
        showToast.error("Error checking link availability. Please try again.");
        setIsCheckingLink(false);
        return;
      } finally {
        setIsCheckingLink(false);
      }
    }
    
    // If validation passes and link is available, save it
    try {
      onSave(trimmedLink);
      showToast.success("Portfolio link updated!");
      handleClose();
    } catch (error) {
      console.error("Error saving portfolio link:", error);
      showToast.error("Failed to update portfolio link. Please try again.");
    }
  };

  const handleClose = () => {
    setEditLink(currentLink);
    setLinkError("");
    setIsCheckingLink(false);
    onClose();
  };

  // Reset editLink when modal opens with new currentLink
  React.useEffect(() => {
    if (isOpen) {
      setEditLink(currentLink);
      setLinkError("");
    }
  }, [isOpen, currentLink]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-bg/50 dark:bg-dark-bg/50 backdrop-blur-sm p-4">
      <div 
        className="bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-light-border-sub dark:border-dark-border-sub">
          <h2 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text">
            Edit Portfolio Link
          </h2>
          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 text-light-text-sub hover:text-light-text dark:text-dark-text-sub dark:hover:text-dark-text transition-colors duration-200 rounded-lg hover:bg-light-border-sub dark:hover:bg-dark-border-sub"
          >
            <IoClose className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-light-text-sub dark:text-dark-text-sub mb-2">
              Portfolio URL
            </label>
            
            {/* Mobile Layout - Stacked */}
            <div className="block sm:hidden space-y-2">
              <div className="px-3 py-2 text-xs text-light-text-sub dark:text-dark-text-sub bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-lg">
                craftfolio.space/
              </div>
              <input
                type="text"
                value={editLink}
                onChange={e => setEditLink(e.target.value)}
                className="w-full px-3 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text focus:border-transparent"
                placeholder="your-portfolio-name"
                autoFocus
              />
            </div>

            {/* Desktop Layout - Inline */}
            <div className="hidden sm:flex items-center bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg overflow-hidden">
              <span className="px-3 py-2 text-sm text-light-text-sub dark:text-dark-text-sub bg-light-bg-sub dark:bg-dark-bg-sub border-r border-light-border-sub dark:border-dark-border-sub whitespace-nowrap">
                craftfolio.space/
              </span>
              <input
                type="text"
                value={editLink}
                onChange={e => setEditLink(e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent text-light-text dark:text-dark-text focus:outline-none focus:ring-0 min-w-0"
                placeholder="your-portfolio-name"
                autoFocus
              />
            </div>

            {/* Error Message */}
            {linkError && (
              <div className="p-2 mt-2 bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border dark:border-dark-border rounded-lg">
                <p className="text-sm text-light-text dark:text-dark-text">
                  ⚠️ {linkError}
                </p>
              </div>
            )}
            
            {/* Help Text */}
            <p className="text-xs text-light-text-sub dark:text-dark-text-sub mt-2">
              Use lowercase letters, numbers, and hyphens only
            </p>
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="p-4 sm:p-6 pt-0 border-t border-light-border-sub dark:border-dark-border-sub">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="plain"
              onClick={handleClose}
              className="w-full sm:w-auto order-2 sm:order-1 text-light-text-sub dark:text-dark-text-sub hover:text-light-text dark:hover:text-dark-text transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveLink}
              disabled={!editLink.trim() || isCheckingLink}
              className="w-full sm:w-auto order-1 sm:order-2 bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg hover:bg-light-text-sub dark:hover:bg-dark-text-sub disabled:bg-light-border dark:disabled:bg-dark-border disabled:text-light-text-sub dark:disabled:text-dark-text-sub"
            >
              {isCheckingLink ? "Checking..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}