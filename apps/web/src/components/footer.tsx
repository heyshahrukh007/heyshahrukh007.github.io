import { SocialLinks } from "@/components/social-links";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/40">
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground sm:justify-start">
          <span>© {year}</span>
          <span aria-hidden>/</span>
          <span className="text-foreground">{site.name}</span>
          <span aria-hidden>/</span>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
