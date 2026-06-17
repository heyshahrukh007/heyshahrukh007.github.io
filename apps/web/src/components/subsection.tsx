import type { ReactNode } from "react";

export function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{title}</h3>
      {children}
    </div>
  );
}
