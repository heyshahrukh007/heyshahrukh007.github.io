import { cn } from "@/lib/utils";

type ExternalLinkProps = Omit<React.ComponentProps<"a">, "href" | "target" | "rel"> & {
  href: string;
};

function isExternalHref(href: string): boolean {
  return href.startsWith("https://") || href.startsWith("http://");
}

export function ExternalLink({ className, children, href, ...props }: ExternalLinkProps) {
  if (!isExternalHref(href)) {
    throw new Error("ExternalLink only supports external http(s) URLs");
  }

  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(className)}
    >
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
