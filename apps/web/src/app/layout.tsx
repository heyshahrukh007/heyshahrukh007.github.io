import "@fontsource-variable/inter";

import "../index.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import SkipLink from "@/components/skip-link";
import { rootMetadata } from "@/lib/seo";

export const metadata = rootMetadata;

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=document.documentElement.classList;var s=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.remove("light","dark");if(t==="light"||t==="dark"){d.classList.add(t)}else{d.classList.add(s)}}catch(e){var s=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.add(s)}})();`;

const motionInitScript = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("motion-ready")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: motionInitScript }} />
      </head>
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
