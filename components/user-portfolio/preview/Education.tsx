import React from 'react';

type EducationProps = {
  education: Array<{
    institution_name: string;
    period: string;
    description: string;
    course?: string;
    degree?: string;
  }>;
};

export default function Education({ education }: EducationProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      {/* Left column - Title */}
      <div className="md:col-span-1">
        <h2 className="section-header">Education</h2>
      </div>
      
      {/* Right column - Content */}
      <div className="md:col-span-3 space-y-6">
        {education.map((edu, index) => (
          <div 
            key={index} 
            className="section-card"
          >
            {/* Education Header */}
            <div className="mb-4">
              <div className="">
                <p className="section-card-header">{edu.institution_name}</p>
                <p className="text-sm">{edu.period}</p>
              </div>
            </div>

            {/* Description */}
            {edu.description && (
              <div className="section-paragraph">
                {edu.description.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}