import React from 'react';

type AboutProps = {
  about: string;
};

export default function About({ about }: AboutProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      {/* Left column - Title */}
      <div className="md:col-span-1">
        <h2 className="section-header">About</h2>
      </div>
      
      {/* Right column - Content */}
      <div className="md:col-span-3 space-y-6">
        <div className="text-light-text-sub dark:text-dark-text-sub leading-relaxed text-md p-4">
          {about.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}