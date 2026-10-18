import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AOL Modern Interface",
  description: "Modern interface for AOL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex">
                <span className="font-bold text-xl">AOL Modern</span>
              </div>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a href="/" className="transition-colors hover:text-foreground/80 text-foreground">
                  Home
                </a>
                <a href="/email" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Email
                </a>
                <a href="/chat" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Chat
                </a>
                <a href="/forums" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Forums
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="py-6 border-t border-border/40">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                AOL Modern Interface - Works with your existing AOL authentication
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}