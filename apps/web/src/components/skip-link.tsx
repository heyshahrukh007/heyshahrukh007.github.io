export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="absolute top-4 left-4 z-100 -translate-y-[200%] rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-ring transition-transform focus:translate-y-0 focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
