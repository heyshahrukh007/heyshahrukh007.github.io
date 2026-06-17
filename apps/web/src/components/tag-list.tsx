export function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <span className="inline-flex rounded-full border border-border/60 bg-muted/20 px-3.5 py-1.5 text-xs text-muted-foreground motion-interactive hover:border-border hover:text-foreground">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
