import { hero } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeroCodeSnippetProps = {
  className?: string;
  compact?: boolean;
};

const { developerSnippet: snippet } = hero;

function CodeToken({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
}

export function HeroCodeSnippet({ className, compact = false }: HeroCodeSnippetProps) {
  return (
    <figure
      className={cn(
        "rounded-xl border border-border/45 bg-card/70 shadow-lg ring-1 ring-border/30 backdrop-blur-lg",
        className,
      )}
    >
      <figcaption className="sr-only">Developer profile summary as code</figcaption>

      <div
        aria-hidden
        className={cn(
          "flex items-center gap-1.5 border-b border-border/50",
          compact ? "px-2.5 py-2" : "px-3 py-2.5 sm:px-4 sm:py-3",
        )}
      >
        <span className={cn("rounded-full bg-[#ff5f57]", compact ? "size-2" : "size-2.5")} />
        <span className={cn("rounded-full bg-[#febc2e]", compact ? "size-2" : "size-2.5")} />
        <span className={cn("rounded-full bg-[#28c840]", compact ? "size-2" : "size-2.5")} />
      </div>

      <pre
        className={cn(
          "overflow-x-auto font-mono whitespace-pre-wrap wrap-break-word",
          compact
            ? "p-2.5 text-[0.75rem] leading-[1.55]"
            : "p-3 text-xs leading-[1.6] sm:p-4 sm:text-[0.8125rem] sm:leading-[1.65] md:text-sm",
        )}
      >
        <code>
          <div>
            <CodeToken className="text-primary">const</CodeToken>{" "}
            <CodeToken className="text-foreground">{snippet.variableName}</CodeToken>{" "}
            <CodeToken className="text-muted-foreground">=</CodeToken>{" "}
            <CodeToken className="text-muted-foreground">{"{"}</CodeToken>
          </div>
          <div className={compact ? "pl-3" : "pl-4"}>
            <CodeToken className="text-foreground">name</CodeToken>
            <CodeToken className="text-muted-foreground">: </CodeToken>
            <CodeToken className="text-primary">&quot;{snippet.name}&quot;</CodeToken>
            <CodeToken className="text-muted-foreground">,</CodeToken>
          </div>
          <div className={compact ? "pl-3" : "pl-4"}>
            <CodeToken className="text-foreground">role</CodeToken>
            <CodeToken className="text-muted-foreground">: </CodeToken>
            <CodeToken className="text-primary">&quot;{snippet.role}&quot;</CodeToken>
            <CodeToken className="text-muted-foreground">,</CodeToken>
          </div>
          <div className={compact ? "pl-3" : "pl-4"}>
            <CodeToken className="text-foreground">skills</CodeToken>
            <CodeToken className="text-muted-foreground">: [</CodeToken>
          </div>
          {snippet.skills.map((skill, index) => (
            <div key={skill} className={compact ? "pl-6" : "pl-8"}>
              <CodeToken className="text-primary">&quot;{skill}&quot;</CodeToken>
              <CodeToken className="text-muted-foreground">
                {index < snippet.skills.length - 1 ? "," : ""}
              </CodeToken>
            </div>
          ))}
          <div className={compact ? "pl-3" : "pl-4"}>
            <CodeToken className="text-muted-foreground">],</CodeToken>
          </div>
          <div className={compact ? "pl-3" : "pl-4"}>
            <CodeToken className="text-foreground">passion</CodeToken>
            <CodeToken className="text-muted-foreground">: </CodeToken>
            <CodeToken className="text-primary">&quot;{snippet.passion}&quot;</CodeToken>
          </div>
          <div>
            <CodeToken className="text-muted-foreground">{"};"}</CodeToken>
          </div>
        </code>
      </pre>
    </figure>
  );
}
