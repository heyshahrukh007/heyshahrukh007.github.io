import Link from "next/link";

import { ExternalLink } from "@/components/external-link";
import { InquiryPanel } from "@/components/inquiry-panel";
import { LocationMap } from "@/components/location-map";
import { Subsection } from "@/components/subsection";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { LinkArrowRightIcon, LinkArrowUpRightIcon } from "@/components/link-icons";
import { contact, getEnabledSocialLinks, site, socialLinks } from "@/lib/site";
import { textLinkClassName, textLinkWithIconClassName } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  headingLevel?: 1 | 2;
};

export default function ContactSection({ headingLevel = 2 }: ContactSectionProps) {
  const profiles = getEnabledSocialLinks(socialLinks);
  const github = profiles.find((profile) => profile.label === "GitHub");

  return (
    <section id="contact" aria-labelledby="contact-heading" className="space-y-10">
      <SectionHeading
        id="contact-heading"
        headingLevel={headingLevel}
        title={contact.title}
        description={contact.summary}
      />

      <header className="max-w-2xl space-y-3 border-t border-border/40 pt-10">
        <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{site.name}</h3>
        <p className="text-sm text-primary/80">{site.role}</p>
        <p className="text-xs text-muted-foreground">{site.location}</p>
      </header>

      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{contact.intro}</p>

      <div className="space-y-10 border-t border-border/40 pt-10">
        <Subsection title="Send a message">
          <InquiryPanel />
        </Subsection>

        <Subsection title="Contact details">
          <dl className="max-w-2xl divide-y divide-border/40">            <div className="flex flex-col gap-1 py-4 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between">
              <dt className="text-sm font-medium text-foreground">Email</dt>
              <dd>
                <a href={contact.email.href} className={cn("text-sm", textLinkClassName)}>
                  {contact.email.address}
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
              <dt className="text-sm font-medium text-foreground">Location</dt>
              <dd className="text-sm text-muted-foreground">{site.location}</dd>
            </div>
          </dl>
        </Subsection>

        <Subsection title="Location">
          <LocationMap />
        </Subsection>

        {profiles.length > 0 ? (
          <Subsection title="Profiles">
            <ul className="max-w-2xl space-y-3">
              {profiles.map((profile) => (
                <li
                  key={profile.label}
                  className="rounded-xl border border-border/50 bg-muted/15 px-4 py-3"
                >
                  <p className="text-sm font-medium text-foreground">{profile.label}</p>
                  <p className="mt-2 text-sm">
                    <ExternalLink href={profile.href} className={textLinkWithIconClassName}>
                      View {profile.label} profile
                      <LinkArrowUpRightIcon />
                    </ExternalLink>
                  </p>
                </li>
              ))}
            </ul>
          </Subsection>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={contact.email.href}
            className={cn(buttonVariants({ shape: "pill", size: "lg" }), "inline-flex w-full justify-center px-5 sm:w-auto")}
          >
            Send email
          </a>
          {github ? (
            <ExternalLink
              href={github.href}
              className={cn(
                buttonVariants({ variant: "outline", shape: "pill", size: "lg" }),
                "group inline-flex w-full items-center justify-center gap-1.5 px-5 sm:w-auto",
              )}
            >
              GitHub
              <LinkArrowUpRightIcon />
            </ExternalLink>
          ) : null}
        </div>

        <p className="text-sm">
          <Link href="/resume" className={cn("text-sm", textLinkWithIconClassName)}>
            View resume
            <LinkArrowRightIcon />
          </Link>
        </p>
      </div>
    </section>
  );
}
