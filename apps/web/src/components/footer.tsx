export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Shahrukh Mansuri. All rights reserved.</p>
        <p className="rounded-md border border-border/40 bg-card/50 px-2.5 py-1 text-xs sm:text-sm">
          Built with Next.js + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
