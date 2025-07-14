import React from 'react';
import { RiLoader4Fill } from "react-icons/ri";

type LoaderProps = {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function Loader({ 
  message = "Loading...", 
  size = 'md',
  className = "" 
}: LoaderProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className={`flex flex-1 flex-col items-center justify-center ${className}`}>
      <RiLoader4Fill 
        className={`animate-spin text-light-text dark:text-dark-text ${sizeClasses[size]} mb-4`}
      />
      <div className={`${textSizeClasses[size]} font-medium text-light-text dark:text-dark-text`}>
        {message}
      </div>
    </div>
  );
}