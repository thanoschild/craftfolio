import React from "react";
import { FormDataType } from "@/types/PortfolioForm";
import Link from "next/link";
import { FaEnvelope, FaLinkedin, FaGithub, FaBriefcase } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";

type HeaderProps = {
  formData: FormDataType;
};

export default function Header({ formData }: HeaderProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="relative px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-12">
            {/* Profile Picture */}
            <div className="relative mb-8">
              {formData.image_url ? (
                <Image
                  src={formData.image_url}
                  alt={formData.name || "Profile"}
                  width={160} // sm:w-40
                  height={160} // sm:h-40
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl border-4 border-light-bg dark:border-dark-bg"
                />
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-light-text to-light-text-sub dark:from-dark-text dark:to-dark-text-sub rounded-full flex items-center justify-center text-4xl sm:text-5xl font-bold text-light-bg dark:text-dark-bg shadow-xl">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}

              {/* Open to Work Badge */}
              {formData.open_to_work && (
                <div className="absolute -bottom-2 -right-2 bg-light-bg dark:bg-dark-bg rounded-full p-1 shadow-lg border border-light-border-sub dark:border-dark-border-sub">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-light-bg-sub dark:bg-dark-bg-sub rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-light-text dark:text-dark-text">
                      Open to work
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Name and Role */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-light-text dark:text-dark-text tracking-tight">
                {formData.name || "Your Name"}
              </h1>

              {formData.current_role && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-light-bg-sub dark:bg-dark-bg-sub rounded-full border border-light-border-sub dark:border-dark-border-sub">
                  <FaBriefcase className="w-4 h-4 text-light-text-sub dark:text-dark-text-sub" />
                  <span
                    className="text-sm sm:text-base font-medium text-light-text dark:text-dark-text truncate"
                    title={formData.current_role}
                  >
                    {formData.current_role}
                  </span>
                </div>
              )}

              {/* Location */}
              {formData.address && (
                <div className="flex items-center justify-center gap-2 text-light-text-sub dark:text-dark-text-sub">
                  <HiOutlineLocationMarker className="w-4 h-4" />
                  <span className="text-sm sm:text-base">
                    {formData.address}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-8">
            {/* Email */}
            {formData.email && (
              <Link
                href={`mailto:${formData.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="section-header-icon"
              >
                <FaEnvelope className="w-5 h-5" />
                <span className="text-lg font-medium">Email</span>
              </Link>
            )}

            {/* LinkedIn */}
            {formData.linkedin_url && (
              <Link
                href={formData.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="section-header-icon"
              >
                <FaLinkedin className="w-5 h-5" />
                <span className="text-lg font-medium">LinkedIn</span>
              </Link>
            )}

            {/* GitHub */}
            {formData.github_url && (
              <Link
                href={formData.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="section-header-icon"
              >
                <FaGithub className="w-5 h-5" />
                <span className="text-lg font-medium">Github</span>
              </Link>
            )}

            {/* Twitter */}
            {formData.twitter_url && (
              <Link
                href={formData.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="section-header-icon"
              >
                <FaXTwitter className="w-5 h-5" />
                <span className="text-lg font-medium">Twitter</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
