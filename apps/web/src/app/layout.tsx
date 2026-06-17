import "@fontsource-variable/inter";

import "../index.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import SkipLink from "@/components/skip-link";
import { rootMetadata } from "@/lib/seo";

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
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
