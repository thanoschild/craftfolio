"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import Link from "next/link";

export default function PortfolioFooter() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render theme-dependent content after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { value: "light", label: "Light", icon: FiSun },
    { value: "dark", label: "Dark", icon: FiMoon },
    { value: "system", label: "System", icon: FiMonitor },
  ];

  return (
    <footer className="border-t border-light-border-sub dark:border-dark-border-sub mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Built with Craftfolio */}
          <div className="flex items-center gap-2 text-sm text-light-text-sub dark:text-dark-text-sub">
            <span>Built using</span>
            <Link
              href={process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Craftfolio
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-light-bg-sub dark:bg-dark-bg-sub rounded-lg p-1">
              {!mounted ? (
                // Better fallback UI that matches the actual component structure
                <div className="flex items-center gap-0">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-light-bg dark:bg-dark-bg rounded-md animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                themes.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-md text-sm font-medium transition-all duration-200
                      ${
                        theme === value
                          ? "bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text shadow-sm"
                          : "text-light-text-sub dark:text-dark-text-sub hover:text-light-text dark:hover:text-dark-text hover:bg-light-bg/50 dark:hover:bg-dark-bg/50"
                      }
                    `}
                    title={`Switch to ${label} theme`}
                    aria-label={`Switch to ${label} theme`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
