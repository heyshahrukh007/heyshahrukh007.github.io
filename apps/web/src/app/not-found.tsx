import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Page not found
      </h1>
      <p className="max-w-md text-base leading-relaxed text-muted-foreground">
        The page you are looking for does not exist or may have moved.
      </p>
      <div>
        <Link href="/" className={cn(buttonVariants({ shape: "pill", size: "lg" }), "px-5")}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
