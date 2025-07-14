"use client";
import Button from "../ui/Button";
import { LuStar } from "react-icons/lu";
import Link from "next/link";
import Feature from "./Feature";
import Preview from "./Preview";

export default function HomePage() {
  return (
    <div className="bg-light-bg dark:bg-dark-bg overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-full text-sm font-medium text-light-text-sub dark:text-dark-text-sub">
                <LuStar className="w-4 h-4" />
                <span>Trusted by developers</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text leading-tight">
                  Build Your{" "}
                  <span className="bg-gradient-to-r from-light-text to-light-text-sub dark:from-dark-text dark:to-dark-text-sub bg-clip-text text-transparent">
                    Portfolio
                  </span>
                  <br />
                  In Minutes
                </h1>
                <p className="text-lg md:text-xl text-light-text-sub dark:text-dark-text-sub max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Transform your resume into a stunning, professional portfolio
                  website. No coding required. Just upload and publish.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/upload">
                  <Button variant="primary" className="px-4 py-5">
                    Upload Resume
                  </Button>
                </Link>
                <Link href="/portfolios">
                  <Button variant="secondary" className="px-4 py-5">
                    View Portfolios
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-light-border-sub dark:border-dark-border-sub">
                <div className="text-center">
                  <div className="text-2xl font-bold text-light-text dark:text-dark-text">
                    Always
                  </div>
                  <div className="text-sm text-light-text-sub dark:text-dark-text-sub">
                    free
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-light-text dark:text-dark-text">
                    2min
                  </div>
                  <div className="text-sm text-light-text-sub dark:text-dark-text-sub">
                    Average Setup
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-light-text dark:text-dark-text">
                    99%
                  </div>
                  <div className="text-sm text-light-text-sub dark:text-dark-text-sub">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Preview */}
            <Preview />
          </div>
        </div>
      </div>

      <div className="py-16">
        <Feature />
      </div>
    </div>
  );
}
