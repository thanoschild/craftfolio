import React from 'react';
import Header from './preview/Header';
import About from './preview/About';
import Experience from './preview/Experience';
import Projects from './preview/Projects';
import Education from './preview/Education';
import Skills from './preview/Skills';
import Other from './preview/Other';
import { FormDataType } from "@/types/PortfolioForm";

type PreviewPortfolioProps = {
  formData: FormDataType;
};

export default function PreviewPortfolio({ formData }: PreviewPortfolioProps) {
  if (!formData) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-light-text dark:text-dark-text">
            No data available
          </div>
          <div className="text-sm text-light-text-sub dark:text-dark-text-sub">
            Please upload your resume to generate portfolio
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 mb-8">
          <div className="max-w-5xl mx-auto">
            <Header formData={formData} />
            
            <div className="space-y-16 mt-8">
              {formData.about && <About about={formData.about} />}
              
              {formData.experience && formData.experience.length > 0 && (
                <Experience experiences={formData.experience} />
              )}
              
              {formData.projects && formData.projects.length > 0 && (
                <Projects projects={formData.projects} />
              )}
              
              {formData.education && formData.education.length > 0 && (
                <Education education={formData.education} />
              )}
              
              {formData.skills && formData.skills.length > 0 && (
                <Skills skills={formData.skills} />
              )}
              
              {formData.other && formData.other.length > 0 && (
                <Other others={formData.other} />
              )}
            </div>
          </div>
        </div>
  );
}