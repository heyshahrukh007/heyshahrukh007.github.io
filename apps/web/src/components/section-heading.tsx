import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  headingLevel?: 1 | 2;
};

export function SectionHeading({
  id,
  title,
  description,
  className,
  align = "left",
  headingLevel = 2,
}: SectionHeadingProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" && "mx-auto max-w-xl text-center",
        className,
      )}
    >
      <Heading
        id={id}
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        {title}
      </Heading>
      {description ? (
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
