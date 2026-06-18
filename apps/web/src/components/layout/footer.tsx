import { SocialLinks } from "@/components/shared/social-links";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/40">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          © {year} <span className="text-foreground">{site.name}</span>
        </p>
        <SocialLinks variant="icons" className="justify-center sm:justify-end" />
      </div>
    </footer>
  );
}
