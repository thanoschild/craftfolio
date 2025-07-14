'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils'; 
import { RiLoader4Line } from "react-icons/ri";

type ButtonProps = {
  buttonText?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconClassName?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loader?: boolean;
  events?: Partial<React.DOMAttributes<HTMLButtonElement>>;
  callback?: () => void;
  children?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary: 'bg-dark-bg text-dark-text dark:bg-light-bg dark:text-light-text hover:shadow-lg',
  secondary: 'text-light-text dark:text-dark-text hover:shadow-lg border border-light-border dark:border-dark-border',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  plain: ""
};

const sizeClasses = {
  sm: 'px-2 py-2 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-lg',
};

export default function Button({
  buttonText,
  type = 'button',
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  iconClassName = "",
  disabled = false,
  loader = false,
  events = {},
  callback,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loader}
      onClick={callback}
      {...events}
      className={cn(
        'flex items-center justify-center font-semibold transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-2 active:shadow-none leading-5 rounded-xl py-1.5 h-8 px-4 hover:cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loader ? (
        <RiLoader4Line className="animate-spin h-5 w-5" />
      ) : (
        <>
          {icon && <span className={iconClassName}>{icon}</span>}
          {buttonText}
          {children}
        </>
      )}
    </button>
  );
}