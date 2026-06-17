import { Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import SkipLink from "@/components/skip-link";
import { rootMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = rootMetadata;

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
            <SkipLink />
            <Header />
            <main
              id="main-content"
              tabIndex={-1}
              className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12 outline-none sm:py-16"
            >
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
