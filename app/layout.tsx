import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import MainLayout from "@/components/layout/MainLayout";
import { metadata } from "@/lib/metadata";
import { PaginationProvider } from "@/contexts/PageContext";
import "./globals.css";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.ico" sizes="any" />
        </head>
        <body className="antialiased bg-light-bg dark:bg-dark-bg min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PaginationProvider>
              <div className="min-h-screen">
                <MainLayout>{children}</MainLayout>
              </div>
            </PaginationProvider>
            <ToastProvider />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
