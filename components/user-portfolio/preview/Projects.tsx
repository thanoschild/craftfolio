import Link from 'next/link';
import React from 'react';
import { PiArrowUpRightBold } from "react-icons/pi";

type ProjectsProps = {
  projects: Array<{
    project_name: string;
    project_url: string;
    description: string;
  }>;
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      {/* Left column - Title */}
      <div className="md:col-span-1">
        <h2 className="section-header">Projects</h2>
      </div>

      {/* Right column - Content */}
      <div className="md:col-span-3 space-y-6">
        {projects.map((project, index) => {
          const ProjectCard = (
            <div className="section-card group">
              {/* Header - Project Name */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <h3 className="section-card-header">{project.project_name}</h3>
                  {project.project_url && (
                    <PiArrowUpRightBold className="section-link-icon" />
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="section-paragraph">
                {project.description
                  .split("\n")
                  .map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          );

          // If project URL exists, wrap in link
          if (project.project_url) {
            return (
              <Link
                key={index}
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {ProjectCard}
              </Link>
            );
          }

          // Otherwise, render without link
          return (
            <div key={index} className="block">
              {ProjectCard}
            </div>
          );
        })}
      </div>
    </section>
  );
}