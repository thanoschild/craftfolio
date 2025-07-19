"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import { RiGeminiLine } from "react-icons/ri";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render theme-dependent content after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="w-full bg-light-bg dark:bg-dark-bg border-t border-light-border-sub dark:border-dark-border-sub mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="text-lg font-bold text-light-text dark:text-dark-text hover:text-light-text-sub dark:hover:text-dark-text-sub transition-colors"
            >
              Craftfolio
            </Link>
            <p className="text-sm text-light-text-sub dark:text-dark-text-sub">
              Powered by{" "}
              <Link
                href="https://ai.google/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium inline-flex items-center gap-1 align-middle text-light-text dark:text-dark-text hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <RiGeminiLine className="w-4 h-4 text-blue-600 inline-block" />
                <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Gemini
                </span>
              </Link>
            </p>
          </div>

          {/* Center - Creative Message */}
          <div className="flex items-center gap-6">
            <p className="text-sm text-light-text-sub dark:text-dark-text-sub">
              Crafting Digital Stories • 2025
            </p>
          </div>

          {/* Right side - Social Links & Theme Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/thanoschild/craftfolio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="icon-style"
            >
              <FaGithub className="w-4 h-4 text-light-text dark:text-dark-text" />
            </Link>

            <Link
              href="https://linkedin.com/in/h-sumeet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="icon-style"
            >
              <FaLinkedinIn className="w-4 h-4 text-light-text dark:text-dark-text" />
            </Link>

            <Button
              aria-label="Toggle Theme"
              size="sm"
              variant="plain"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="icon-style"
            >
              {!mounted ? (
                <div className="w-4 h-4" />
              ) : theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
                <FiSun className="w-4 h-4 text-light-text dark:text-dark-text" />
              ) : (
                <FiMoon className="w-4 h-4 text-light-text dark:text-dark-text" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
