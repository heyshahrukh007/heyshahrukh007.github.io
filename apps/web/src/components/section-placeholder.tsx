type SectionPlaceholderProps = {
  title: string;
  description: string;
};

export default function SectionPlaceholder({ title, description }: SectionPlaceholderProps) {
  return (
    <section className="flex flex-1 flex-col justify-center gap-2">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </section>
  );
}
