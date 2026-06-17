import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { site, socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const githubLink = socialLinks.find((item) => item.label === "GitHub" && item.enabled);

export default function UnderConstruction() {
  return (
    <section className="flex flex-1 flex-col justify-center gap-8">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{site.role}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {site.name}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Portfolio in progress. Sections for experience, projects, articles, and contact are
          being built.
        </p>
      </div>

      {githubLink ? (
        <div>
          <Link
            href={githubLink.href}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full px-5")}
          >
            View GitHub
          </Link>
        </div>
      ) : null}
    </section>
  );
}
