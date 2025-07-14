"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { BiSolidUserAccount } from "react-icons/bi";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-light-bg dark:bg-dark-bg backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-light-text dark:text-dark-text">
              <BiSolidUserAccount className="text-2xl sm:text-3xl" />
            </div>
            <Link
              href="/"
              className="text-xl sm:text-2xl font-semibold text-light-text dark:text-dark-text hover:text-light-text-sub dark:hover:text-dark-text-sub transition-colors"
            >
              Craftfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/portfolios"
              className="text-base lg:text-lg font-medium text-light-text dark:text-dark-text hover:text-light-text-sub dark:hover:text-dark-text-sub transition-colors"
            >
              Portfolios
            </Link>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <Link href="/upload">
                <Button variant="primary">Sign in</Button>
              </Link>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-7 h-7",
                  },
                }}
              />
            </SignedIn>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-light-text dark:text-dark-text hover:bg-light-bg-sub dark:hover:bg-dark-bg-sub transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-light-border-sub dark:border-dark-border-sub">
            <div className="py-4 space-y-4">
              <Link
                href="/portfolios"
                className="block text-lg font-medium text-light-text dark:text-dark-text hover:text-light-text-sub dark:hover:text-dark-text-sub transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolios
              </Link>

              <SignedOut>
                <Link
                  href="/upload"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  <Button variant="primary" className="w-full justify-center">Sign in</Button>
                </Link>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
