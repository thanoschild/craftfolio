import React from 'react';

type SkillsProps = {
  skills: string[];
};

export default function Skills({ skills }: SkillsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      {/* Left column - Title */}
      <div className="md:col-span-1">
        <h2 className="section-header">Skills</h2>
      </div>
      
      {/* Right column - Content */}
      <div className="md:col-span-3 p-4">
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="section-skill"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}