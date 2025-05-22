
"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    // For admin routes, Next.js will automatically use the layout
    // defined in src/app/(admin)/layout.tsx to wrap the page component.
    // So, we just render children here, and Next.js handles the rest.
    return <>{children}</>;
  }

  // Public routes get the standard Header, main content, and Footer
  return (
    <>
      <Header />
      <main className="flex-grow container py-8">{children}</main>
      <Footer />
    </>
  );
}
