import "@fontsource-variable/inter";

import "../index.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { MouseSpotlight } from "@/components/mouse-spotlight";
import Providers from "@/components/providers";
import SkipLink from "@/components/skip-link";
import { rootMetadata } from "@/lib/seo";

export const metadata = rootMetadata;

const motionInitScript = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("motion-ready")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionInitScript }} />
      </head>
      <body className="antialiased">
        <Providers>
          <div className="relative flex min-h-svh flex-col">
            <MouseSpotlight />
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
