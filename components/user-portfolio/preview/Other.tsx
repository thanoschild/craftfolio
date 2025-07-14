import Link from 'next/link';
import React from 'react';
import { PiArrowUpRightBold } from "react-icons/pi";

type OtherProps = {
  others: Array<{
    title: string;
    link: string;
    description: string;
  }>;
};

export default function Other({ others }: OtherProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      {/* Left column - Title */}
      <div className="md:col-span-1">
        <h2 className="section-header">Profiles</h2>
      </div>

      {/* Right column - Content */}
      <div className="md:col-span-3 space-y-6">
        {others.map((item, index) => {
          const OtherCard = (
            <div className="section-card group">
              {/* Header - Title */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <h3 className="section-card-header">{item.title}</h3>
                  {item.link && (
                    <PiArrowUpRightBold className="section-link-icon" />
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="section-paragraph">
                {item.description
                  .split("\n")
                  .map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          );

          // If link exists, wrap in link
          if (item.link) {
            return (
              <Link
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {OtherCard}
              </Link>
            );
          }

          // Otherwise, render without link
          return (
            <div key={index} className="block">
              {OtherCard}
            </div>
          );
        })}
      </div>
    </section>
  );
}