import Link from "next/link";

import { site, socialLinks } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const enabledSocial = socialLinks.filter((item) => item.enabled);

  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>© {year}</span>
          <span aria-hidden>/</span>
          <span className="text-foreground">{site.name}</span>
          {enabledSocial.length > 0 ? (
            <>
              <span aria-hidden>/</span>
              {enabledSocial.map((item, index) => (
                <span key={item.label} className="inline-flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>/</span> : null}
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </>
          ) : null}
        </p>
      </div>
    </footer>
  );
}
