'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  const isDynamicRoute = pathname !== '/' && 
                         !pathname.startsWith('/upload') && 
                         !pathname.startsWith('/user-portfolio') && 
                         !pathname.startsWith('/templates') && 
                         !pathname.startsWith('/pricing') && 
                         !pathname.startsWith('/portfolios') &&
                         !pathname.startsWith('/sign-in') &&
                         !pathname.startsWith('/sign-up');

  if (isDynamicRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <main className=" flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </main>
  );
}