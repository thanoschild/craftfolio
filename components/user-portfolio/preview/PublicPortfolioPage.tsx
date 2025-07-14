"use client";

import React, { useEffect, useState } from 'react';
import Header from './Header';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Education from './Education';
import Skills from './Skills';
import Other from './Other';
import PortfolioFooter from './PortfolioFooter';
import Loader from '@/components/ui/Loader';
import { FormDataType } from '@/types/PortfolioForm';

type PublicPortfolioPageProps = {
  id: string;
};

export default function PublicPortfolioPage({ id }: PublicPortfolioPageProps) {
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/portfolio/public/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Portfolio not found or not publicly available');
          } else {
            setError('Failed to load portfolio');
          }
          return;
        }
        
        const data = await response.json();
        setFormData(data.resumeData || data);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-theme-light-bg dark:bg-theme-dark-bg">
        <Loader message="Loading portfolio..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-theme-light-bg dark:bg-theme-dark-bg">
        <div className="text-center">
          <div className="text-lg text-theme-dark dark:text-theme-light mb-2">
            {error}
          </div>
          <div className="text-sm text-theme-light-text dark:text-theme-dark-text">
            The portfolio you&apos;re looking for might be private or doesn&apos;t exist.
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-theme-light-bg dark:bg-theme-dark-bg">
        <div className="text-center">
          <div className="text-lg text-theme-dark dark:text-theme-light">
            No portfolio data available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
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

        <PortfolioFooter/>
      </div>
    </div>
  );
}