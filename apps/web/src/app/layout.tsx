import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "heyshahrukh007.github.io",
  description: "Site under construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="relative flex min-h-svh flex-col">
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,oklch(0.7_0.15_162/0.12),transparent_32%),radial-gradient(circle_at_85%_85%,oklch(0.7_0.15_162/0.08),transparent_35%)]"
            />
            <Header />
            <main className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
