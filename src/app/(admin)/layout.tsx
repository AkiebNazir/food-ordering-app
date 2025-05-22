
import type { Metadata } from 'next';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

// Metadata for admin section can be defined here if needed,
// though RootLayout's metadata will also apply.
// export const metadata: Metadata = {
//   title: 'MunchEase Admin',
// };

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is nested inside RootLayout by Next.js App Router.
  // RootLayout provides <html>, <body>, ThemeProvider, CartProvider, Global Toaster.
  // MainLayoutContent decides to render this AdminLayout (implicitly via Next.js routing).
  // This AdminLayout provides the specific structure for the admin section.
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/30">
        {children}
      </main>
    </div>
  );
}
