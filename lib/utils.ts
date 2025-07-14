import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from 'nanoid';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};


export function generatePortfolioId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/(^-|-$)+/g, '');   

  const unique = nanoid(6);
  return `${slug}-${unique}`;
}

export function isValidSlug(id: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(id);
}