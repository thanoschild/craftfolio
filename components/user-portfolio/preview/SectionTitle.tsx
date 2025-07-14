import React from 'react';

type SectionTitleProps = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="mb-3">
      <h2 className="text-xl font-bold text-theme-dark dark:text-theme-light mb-1">
        {title}
      </h2>
      <div className="w-12 h-[3px] bg-theme-light-text dark:bg-theme-dark-text rounded-full"></div>
    </div>
  );
}