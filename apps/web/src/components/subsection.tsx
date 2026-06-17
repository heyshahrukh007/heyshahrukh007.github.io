import type { ReactNode } from "react";

export function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      {children}
    </div>
  );
}
