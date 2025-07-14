import Link from "next/link";
import React from "react";
import { PiArrowUpRightBold } from "react-icons/pi";

type ExperienceProps = {
  experiences: Array<{
    company_name: string;
    role: string;
    period: string;
    place: string;
    description: string;
    company_website_url?: string;
  }>;
};

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      {/* Left column - Title */}
      <div className="md:col-span-1">
        <h2 className="section-header">Experience</h2>
      </div>

      {/* Right column - Content */}
      <div className="md:col-span-3 space-y-6">
        {experiences.map((exp, index) => {
          const ExperienceCard = (
            <div className="section-card group">
              {/* Header - Role and Company */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <h3 className="section-card-header">{exp.role}</h3>
                  {exp.company_website_url && (
                    <PiArrowUpRightBold className="section-link-icon" />
                  )}
                </div>
              </div>

              {/* Company and Period */}
              <div className="mb-4">
                <p className="section-card-header-sub">
                  {exp.company_name}
                </p>
                <p className="text-sm">
                  {exp.period}
                </p>
              </div>

              {/* Description */}
              <div className="section-paragraph">
                {exp.description
                  .split("\n")
                  .map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          );

          // If company website URL exists, wrap in link
          if (exp.company_website_url) {
            return (
              <Link
                key={index}
                href={exp.company_website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {ExperienceCard}
              </Link>
            );
          }

          // Otherwise, render without link
          return (
            <div key={index} className="block">
              {ExperienceCard}
            </div>
          );
        })}
      </div>
    </section>
  );
}
